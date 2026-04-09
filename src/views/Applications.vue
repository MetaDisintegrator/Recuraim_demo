<template>
  <div class="applications-page">
    <div class="container">
      <div class="page-header">
        <h2>投递管理与跟踪</h2>
        <p>您的个人求职流程看板，记录每一个投递的脚印</p>
      </div>

      <!-- 统计看板 -->
      <div class="dashboard">
        <div class="stat-card">
          <div class="stat-icon bg-tea-green">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">12</span>
            <span class="stat-label">已投递</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon bg-beige">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">5</span>
            <span class="stat-label">简历被查看</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon bg-papaya">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">3</span>
            <span class="stat-label">笔试/面试安排</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon bg-bronze">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">1</span>
            <span class="stat-label">Offer 录取</span>
          </div>
        </div>
      </div>

      <!-- 状态筛选栏 -->
      <div class="tabs">
        <div 
          class="tab-item" 
          v-for="tab in tabs" 
          :key="tab.value" 
          :class="{ active: currentTab === tab.value }"
          @click="currentTab = tab.value"
        >
          {{ tab.label }}
        </div>
      </div>

      <!-- 投递记录列表 -->
      <div class="applications-list">
        <div class="app-card" v-for="app in filteredApps" :key="app.id">
          <!-- 上半部分：基本信息 -->
          <div class="app-header">
            <div class="app-title-group">
              <h3 class="job-title">{{ app.jobTitle }}</h3>
              <span class="job-salary">{{ app.salary }}</span>
            </div>
            <div class="app-meta">
              <span class="company-name">{{ app.company }}</span>
              <span class="divider">|</span>
              <span class="location">{{ app.location }}</span>
              <span class="divider">|</span>
              <span class="date">投递于 {{ app.applyDate }}</span>
            </div>
          </div>

          <!-- 时间轴进度条 -->
          <div class="progress-timeline">
            <div class="step" v-for="(step, index) in steps" :key="index" :class="getStepClass(app, index)">
              <div class="step-marker"></div>
              <div class="step-label">{{ step }}</div>
              <div class="step-line" v-if="index < steps.length - 1"></div>
            </div>
          </div>

          <!-- 下半部分：操作与详情 -->
          <div class="app-footer">
            <div class="status-tip">
              状态：<strong :class="getStatusColor(app.status)">{{ getStatusLabel(app.status) }}</strong>
              <span v-if="app.remark" class="remark">（{{ app.remark }}）</span>
            </div>
            <div class="actions">
              <button class="btn-update" @click="openUpdateModal(app)" v-if="app.status < 4 && app.status > -1">更新进度</button>
              <button class="btn-outline">查看职位详情</button>
            </div>
          </div>
        </div>

        <div class="empty-state" v-if="filteredApps.length === 0">
          暂无符合该状态的投递记录
        </div>
      </div>
    </div>

    <!-- 更新进度模态框 -->
    <div class="modal-overlay" v-if="showModal">
      <div class="modal">
        <h3>更新投递进度</h3>
        <p class="modal-sub">正在更新《{{ activeApp?.jobTitle }}》的求职流程</p>
        
        <div class="modal-form">
          <label>当前流转状态</label>
          <select v-model="updateData.status">
            <option :value="1">简历被查看/初筛通过</option>
            <option :value="2">笔试/面试流程中</option>
            <option :value="3">已录用 (发Offer)</option>
            <option :value="-1">未通过/流程结束</option>
          </select>

          <label>备注说明（选填）</label>
          <input type="text" v-model="updateData.remark" placeholder="例如：面试时间安排在周五下午2点..." />
        </div>

        <div class="modal-actions">
          <button class="btn-cancel" @click="showModal = false">取消</button>
          <button class="btn-confirm" @click="confirmUpdate">确认更新</button>
        </div>
      </div>
    </div>

    <!-- 成功提示 -->
    <div class="toast-overlay" v-if="showToast">
      <div class="toast">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <span style="font-weight:bold; margin-left:8px;">状态更新成功</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const tabs = [
  { label: '全部投递', value: 'all' },
  { label: '沟通中', value: 'active' },
  { label: '面试安排', value: 'interview' },
  { label: '已录用', value: 'offer' },
  { label: '不合适', value: 'rejected' }
];

const currentTab = ref('all');

const steps = ['成功投递', '筛选中', '面试沟通', '入职/结果'];

// Mock数据 状态映射： 0: 已投递, 1: 查看/初筛, 2: 面试, 3: offer, -1: 淘汰
const applications = ref([
  {
    id: 101,
    jobTitle: '高级前端架构师',
    company: '字节跳动',
    salary: '35K-60K',
    location: '北京',
    applyDate: '2026-04-05 10:20',
    status: 2,
    remark: '预约本周四下午二面'
  },
  {
    id: 102,
    jobTitle: '资深全栈工程师',
    company: '腾讯技术架构部',
    salary: '40K-70K',
    location: '深圳',
    applyDate: '2026-04-01 14:15',
    status: 3,
    remark: '已签发电子版 Offer，期待入职'
  },
  {
    id: 103,
    jobTitle: '前端开发工程师',
    company: '小红书',
    salary: '25K-40K',
    location: '上海',
    applyDate: '2026-04-07 09:30',
    status: 1,
    remark: 'HR刚查阅了您的附件简历'
  },
  {
    id: 104,
    jobTitle: 'Web前端负责人',
    company: '不知名初创公司',
    salary: '20K-35K',
    location: '北京',
    applyDate: '2026-03-25 11:00',
    status: -1,
    remark: '简历匹配度不足，暂不匹配'
  },
  {
    id: 105,
    jobTitle: 'Vue前端开发专家',
    company: '美团到店事业群',
    salary: '30K-45K',
    location: '北京',
    applyDate: '2026-04-08 15:40',
    status: 0,
    remark: '投递成功，等待HR处理'
  }
]);

const filteredApps = computed(() => {
  if (currentTab.value === 'all') return applications.value;
  if (currentTab.value === 'active') return applications.value.filter(a => a.status === 0 || a.status === 1);
  if (currentTab.value === 'interview') return applications.value.filter(a => a.status === 2);
  if (currentTab.value === 'offer') return applications.value.filter(a => a.status === 3);
  if (currentTab.value === 'rejected') return applications.value.filter(a => a.status === -1);
  return applications.value;
});

// 计算时间轴状态点亮逻辑
const getStepClass = (app, index) => {
  if (app.status === -1) {
    // 失败的情况
    if (index === 0) return 'completed';
    if (index === 3) return 'failed'; // 最后一个节点变为红色
    return 'pending'; // 中间的不亮
  }
  
  if (app.status >= index) {
    if (app.status === index && app.status !== 3) {
      return 'current'; // 当前正在进行的步骤跳动
    }
    return 'completed'; // 已经过的步骤实心
  }
  return 'pending';
};

const getStatusLabel = (status) => {
  const map = {
    0: '已投递，待处理',
    1: '初筛通过，沟通中',
    2: '笔试/面试流程中',
    3: '恭喜您，已获得Offer',
    '-1': '很遗憾，暂不匹配'
  };
  return map[status] || '未知';
};

const getStatusColor = (status) => {
  if (status === 3) return 'color-success';
  if (status === -1) return 'color-danger';
  if (status === 2) return 'color-warning';
  return 'color-primary';
};

// 更新交互逻辑
const showModal = ref(false);
const showToast = ref(false);
const activeApp = ref(null);
const updateData = ref({ status: 1, remark: '' });

const openUpdateModal = (app) => {
  activeApp.value = app;
  updateData.value.status = app.status;
  updateData.value.remark = '';
  showModal.value = true;
};

const confirmUpdate = () => {
  if (activeApp.value) {
    activeApp.value.status = parseInt(updateData.value.status);
    activeApp.value.remark = updateData.value.remark;
  }
  showModal.value = false;
  
  // 展示 Toast
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 1500);
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}
.page-header h2 {
  font-size: 26px;
  color: #333;
  margin-bottom: 6px;
}
.page-header p {
  font-size: 15px;
  color: #666;
  margin-bottom: 30px;
}

/* 统计看板 */
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}
.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.03);
  transition: transform 0.2s;
}
.stat-card:hover {  
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
}
.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
}
.bg-tea-green { background: var(--tea-green, #ccd5ae); }
.bg-beige { background: var(--beige, #e9edc9); }
.bg-papaya { background: var(--papaya-whip, #faedcd); }
.bg-bronze { background: var(--light-bronze, #d4a373); color: #fff; }

.stat-info { display: flex; flex-direction: column; }
.stat-value { font-size: 28px; font-weight: bold; color: #333; line-height: 1.2; }
.stat-label { font-size: 13px; color: #666; }

/* Tabs 筛选栏 */
.tabs {
  display: flex;
  gap: 30px;
  border-bottom: 2px solid #eaeaea;
  margin-bottom: 24px;
}
.tab-item {
  padding: 12px 4px;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}
.tab-item:hover { color: #333; }
.tab-item.active {
  color: var(--light-bronze, #d4a373);
  font-weight: bold;
}
.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0; right: 0;
  height: 3px;
  background: var(--light-bronze, #d4a373);
  border-radius: 2px 2px 0 0;
}

/* 列表区 */
.applications-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 60px;
}
.app-card {
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
  transition: border-color 0.2s;
}
.app-card:hover {
  border-color: var(--tea-green, #ccd5ae);
}
.app-header { margin-bottom: 24px; }
.app-title-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.job-title { margin: 0; font-size: 18px; color: #333; }
.job-salary { font-size: 16px; color: #ff6a00; font-weight: bold; }
.app-meta { font-size: 14px; color: #666; display: flex; align-items: center; gap: 8px; }
.divider { color: #eee; }

/* 进度条节点 */
.progress-timeline {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0 20px;
  margin-bottom: 30px;
}
.step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  z-index: 1;
}
.step-marker {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #eee;
  border: 3px solid #fff;
  box-shadow: 0 0 0 1px #ddd;
  margin-bottom: 8px;
  z-index: 2;
  transition: all 0.3s;
}
.step-label {
  font-size: 13px;
  color: #999;
}
.step-line {
  position: absolute;
  top: 8px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: #eee;
  z-index: 0;
}

/* 节点状态样式 */
.step.completed .step-marker {
  background: var(--light-bronze, #d4a373);
  box-shadow: 0 0 0 1px var(--light-bronze, #d4a373);
}
.step.completed .step-line {
  background: var(--light-bronze, #d4a373);
}
.step.completed .step-label { color: #333; }

.step.current .step-marker {
  background: var(--tea-green, #ccd5ae);
  box-shadow: 0 0 0 2px var(--tea-green, #ccd5ae);
  animation: pulse-ring 1.5s infinite;
}
.step.current .step-label { color: #333; font-weight: bold; }

.step.failed .step-marker {
  background: #e53e3e;
  box-shadow: 0 0 0 1px #e53e3e;
}
.step.failed .step-label { color: #e53e3e; font-weight: bold; text-decoration: line-through; }

@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(204, 213, 174, 0.7); }
  70% { box-shadow: 0 0 0 6px rgba(204, 213, 174, 0); }
  100% { box-shadow: 0 0 0 0 rgba(204, 213, 174, 0); }
}

.app-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--cornsilk, #fefae0);
  padding: 14px 20px;
  border-radius: 8px;
  border: 1px dashed var(--beige, #e9edc9);
}
.status-tip { font-size: 14px; color: #555; }
.remark { color: #777; font-size: 13px; }
.actions { display: flex; gap: 12px; }

.color-primary { color: #3182ce; }
.color-warning { color: #dd6b20; }
.color-success { color: #38a169; }
.color-danger { color: #e53e3e; }

.btn-update {
  background: var(--light-bronze, #d4a373);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
}
.btn-update:hover { background: #c39263; }
.btn-outline {
  background: white;
  color: #666;
  border: 1px solid #ccc;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}
.btn-outline:hover { background: #f9f9f9; border-color: #999; }

/* Modal 样式 */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.modal {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  animation: slideUp 0.3s ease;
}
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.modal h3 { margin: 0 0 8px 0; font-size: 20px; }
.modal-sub { color: #666; font-size: 14px; margin-bottom: 24px; }
.modal-form { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
.modal-form label { font-size: 14px; color: #333; font-weight: 500; }
.modal-form select, .modal-form input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}
.modal-form select:focus, .modal-form input:focus { border-color: var(--light-bronze); }
.modal-actions { display: flex; justify-content: flex-end; gap: 12px; }
.btn-cancel { padding: 8px 20px; background: transparent; border: none; color: #666; cursor: pointer; }
.btn-confirm { padding: 8px 20px; background: var(--tea-green, #ccd5ae); color: #333; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
.btn-confirm:hover { background: var(--beige, #e9edc9); }

.toast-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
  pointer-events: none;
  z-index: 1000;
}
.toast {
  background: white;
  border-radius: 8px;
  padding: 14px 24px;
  color: #38a169;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  animation: dropDown 0.3s;
}
@keyframes dropDown {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>