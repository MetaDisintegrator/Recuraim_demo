<template>
  <div class="jobs-page">
    <!-- 顶部拓展栏 (Filter Section) -->
    <div class="top-section">
      <div class="filter-wrapper container">
        <div class="expectation-tabs">
          <div class="expectation-tab" :class="{ active: selectedExpectation === '推荐' }" @click="selectedExpectation = '推荐'">推荐</div>
          <div class="divider">|</div>
          <div class="expectation-tab" :class="{ active: selectedExpectation === '前端开发' }" @click="selectedExpectation = '前端开发'">前端开发</div>
          <div class="expectation-tab" :class="{ active: selectedExpectation === '后端开发' }" @click="selectedExpectation = '后端开发'">后端开发</div>
          <div class="expectation-tab" :class="{ active: selectedExpectation === '产品经理' }" @click="selectedExpectation = '产品经理'">产品经理</div>
        </div>
      </div>
      <div class="sub-filter-wrapper container">
        <div class="filter-row">
          <div class="filter-item" @click="toggleDropdown('city')">
             {{ filters.city || '城市' }} 
             <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          <div class="filter-item" @click="toggleDropdown('salary')">
            {{ filters.salary || '薪资要求' }}
            <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          <div class="filter-item" @click="toggleDropdown('experience')">
            {{ filters.experience || '工作经验' }}
            <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 页面双栏主体 -->
    <div class="container main-content">
      <!-- 左侧：职位列表 -->
      <div class="job-list-panel">
        <div 
          class="job-card" 
          v-for="job in jobs" 
          :key="job.id" 
          :class="{ 'is-selected': selectedJob && selectedJob.id === job.id }"
          @click="selectJob(job)"
        >
          <div class="card-header">
            <h3 class="job-title">{{ job.title }}</h3>
            <span class="job-salary">{{ job.salary }}</span>
          </div>
          <div class="job-tags">
            <span class="tag" v-for="tag in job.tags" :key="tag">{{ tag }}</span>
          </div>
          <div class="company-row">
            <!-- 简单的首字母头像 -->
            <div class="company-avatar-sm">{{ job.company.charAt(0) }}</div>
            <div class="company-name">{{ job.company }} <span class="industry-text">· 互联网</span></div>
            <div class="job-location">{{ job.location }}</div>
          </div>
        </div>
      </div>

      <!-- 右侧：职位详情 (粘性定位) -->
      <div class="job-detail-panel">
        <JobDetail v-if="selectedJob" :job="selectedJob" />
        <div class="empty-state" v-else>
          <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="var(--tea-green, #ccd5ae)" stroke-width="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
            <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"></path>
          </svg>
          <p>请点击左侧卡片查看职位详情</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import JobDetail from '../components/JobDetail.vue';

const selectedExpectation = ref('推荐');
const filters = ref({ city: '', salary: '', experience: '' });
const activeDropdown = ref(null);

const toggleDropdown = (key) => {
  activeDropdown.value = activeDropdown.value === key ? null : key;
};

// Mock 数据
const jobs = ref([
  {
    id: 1,
    title: '高级前端开发工程师',
    company: '字节跳动',
    salary: '25K-45K',
    location: '北京',
    tags: ['5-10年', '本科', 'Vue3', 'Node.js'],
    description: [
      '1. 负责公司核心业务系统的架构设计、开发及优化；',
      '2. 参与前沿技术研究，包括微前端、Serverless、组件库建设等；',
      '3. 与产品经理、UI设计师紧密合作，提升用户体验；',
      '4. 指导并带领初中级工程师，提升团队整体技术能力。',
      '任职要求：',
      '1. 统招本科及以上学历，5年以上前端开发经验；',
      '2. 精通 HTML5, CSS3, JavaScript/TypeScript；',
      '3. 深入理解 Vue3 / React 设计原理，有 SSR 框架（如 Nuxt/Next）实战经验；',
      '4. 具备大型复杂前端项目架构设计能力，注重代码质量与性能优化。'
    ]
  },
  {
    id: 2,
    title: 'Vue 前端开发工程师',
    company: '美团',
    salary: '18K-35K',
    location: '上海',
    tags: ['3-5年', '本科', 'Vue3', 'TypeScript'],
    description: [
      '1. 负责相关业务线后台管理系统和移动端 H5 页面开发；',
      '2. 配合后端工程师一起研讨技术实现方案；',
      '3. 跟进新技术发展，参与技术方案的评审及选型。',
      '任职要求：',
      '1. 计算机相关专业本科以上学历；',
      '2. 扎实的前端基础，熟练使用 Vue3 技术栈；',
      '3. 有独立负责一个中小型项目的能力。'
    ]
  },
  {
    id: 3,
    title: '初级前端研发',
    company: '滴滴出行',
    salary: '12K-20K',
    location: '北京',
    tags: ['1-3年', '本科', 'JavaScript', 'CSS3'],
    description: [
      '岗位职责：',
      '1. 负责基础页面的切图及交互逻辑实现；',
      '2. 负责常规业务需求的日常迭代；',
      '任职要求：',
      '1. 熟悉HTML/CSS/JS等前端基础；',
      '2. 有良好的学习能力及沟通能力。'
    ]
  },
  {
    id: 4,
    title: '资深前端架构师',
    company: '阿里巴巴',
    salary: '40K-70K',
    location: '杭州',
    tags: ['10年以上', '本科', '基建', 'Node.js', '跨端'],
    description: [
      '岗位职责：',
      '1. 负责集团级前端基础设施建设，包括不仅限于构建工具、埋点监控、性能平台；',
      '2. 主导跨部门协作及技术攻坚。'
    ]
  },
  {
    id: 5,
    title: '前端技术专家',
    company: '腾讯',
    salary: '35K-60K',
    location: '深圳',
    tags: ['5-10年', '本科', '多端开发'],
    description: [
      '岗位职责：',
      '1. 主导核心业务技术规划；',
      '2. 解决疑难杂症，带头进行技术创新。'
    ]
  }
]);

const selectedJob = ref(null);

const selectJob = (job) => {
  selectedJob.value = job;
};

// 默认选中第一个
if (jobs.value.length > 0) {
  selectJob(jobs.value[0]);
}
</script>

<style scoped>
.jobs-page {
  min-height: calc(100vh - 64px); /* 减去 navbar 的高度 */
  background-color: #f7f9fa;
  padding-bottom: 40px;
}

/* 顶部筛选区 */
.top-section {
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
  position: sticky;
  top: 64px; /* 如果 Navbar 是 fixed, 那么这里相对于 Navbar 下方; 若不是则为 0 */
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.filter-wrapper {
  padding: 16px 0;
  border-bottom: 1px dashed #f0f0f0;
}
.expectation-tabs {
  display: flex;
  align-items: center;
  gap: 20px;
}
.expectation-tab {
  font-size: 15px;
  color: #555;
  cursor: pointer;
  padding: 4px 0;
  position: relative;
  transition: color 0.2s;
}
.expectation-tab:hover {
  color: #333;
}
.expectation-tab.active {
  font-weight: bold;
  color: #333;
}
.expectation-tab.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background-color: var(--tea-green, #ccd5ae);
  border-radius: 2px;
}
.divider {
  color: #e0e0e0;
}
.sub-filter-wrapper {
  padding: 12px 0;
}
.filter-row {
  display: flex;
  gap: 24px;
}
.filter-item {
  font-size: 14px;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}
.filter-item:hover {
  color: var(--light-bronze, #d4a373);
}
.chevron {
  transition: transform 0.2s;
}

/* 主体双栏布局 */
.main-content {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  align-items: flex-start;
}

/* 左侧职位列表 */
.job-list-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* 中等宽度占比 */
  max-width: 480px;
}
.job-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}
.job-card:hover {
  box-shadow: 0 6px 16px rgba(0,0,0,0.06);
  transform: translateY(-2px);
}
.job-card.is-selected {
  border-color: var(--tea-green, #ccd5ae);
  background-color: var(--cornsilk, #fefae0);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.job-title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
}
.job-salary {
  font-size: 16px;
  color: #ff6a00;
  font-weight: 500;
}
.job-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}
.tag {
  background: #f8f8f8;
  color: #666;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 4px;
}
.company-row {
  display: flex;
  align-items: center;
  gap: 10px;
  border-top: 1px dashed #f0f0f0;
  padding-top: 12px;
}
.company-avatar-sm {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background-color: var(--beige, #e9edc9);
  color: #555;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
.company-name {
  font-size: 14px;
  color: #333;
  flex: 1;
}
.industry-text {
  color: #999;
  font-size: 12px;
}
.job-location {
  font-size: 13px;
  color: #888;
}

/* 右侧详情面板 */
.job-detail-panel {
  flex: 1.5; /* 占比更大 */
  position: sticky;
  top: 150px; /* 吸顶的位置，考虑到导航栏+筛选器的高度 */
  height: calc(100vh - 170px);
}
.empty-state {
  height: 100%;
  background: #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}
.empty-state svg {
  margin-bottom: 16px;
}
</style>