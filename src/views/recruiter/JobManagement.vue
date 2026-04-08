<template>
  <div class="job-management container">
    <div class="header">
      <h2>职位管理</h2>
      <button class="btn-primary" @click="showPostJob = true">
        <span class="icon">+</span> 发布新职位
      </button>
    </div>

    <!-- 状态筛选栏 -->
    <div class="filter-tabs">
      <div class="tab pointer active">招聘中 ({{ jobs.length }})</div>
      <div class="tab pointer">审核中 (0)</div>
      <div class="tab pointer">已下线 (0)</div>
    </div>

    <!-- 职位列表 -->
    <div class="job-list">
      <div class="recruiter-job-card" v-for="job in jobs" :key="job.id">
        <div class="card-header">
          <div class="title-group">
            <h3 class="job-title">{{ job.title }}</h3>
            <span class="job-salary">{{ job.salary }}</span>
          </div>
          <span class="publish-time">更新于 {{ job.updateTime }}</span>
        </div>

        <div class="job-tags">
          <span class="tag" v-for="tag in job.tags" :key="tag">{{ tag }}</span>
        </div>

        <!-- 招聘数据统计 -->
        <div class="job-stats">
          <div class="stat-item pointer" @click="goToCandidates(job.id)">
            <span class="stat-num highlight">{{ job.newResumeCount }}</span>
            <span class="stat-label">新简历</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item pointer" @click="goToCandidates(job.id)">
            <span class="stat-num">{{ job.totalApply }}</span>
            <span class="stat-label">总投递</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-num">{{ job.views }}</span>
            <span class="stat-label">浏览量</span>
          </div>
        </div>

        <!-- 底部操作区 -->
        <div class="card-footer">
          <div class="actions">
            <button class="btn-text">编辑</button>
            <button class="btn-text">关闭职位</button>
          </div>
          <button class="btn-outline pointer" @click="goToCandidates(job.id)">查看候选人</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showPostJob = ref(false);

const jobs = ref([
  {
    id: 101,
    title: '前端开发工程师',
    salary: '15K-25K',
    updateTime: '今天 09:30',
    tags: ['上海', '3-5年', '本科', '全职'],
    newResumeCount: 5,
    totalApply: 24,
    views: 312
  },
  {
    id: 102,
    title: '高级Vue开发',
    salary: '20K-35K',
    updateTime: '昨天 14:00',
    tags: ['北京', '5年以上', '本科', '全职'],
    newResumeCount: 2,
    totalApply: 16,
    views: 189
  },
  {
    id: 103,
    title: 'UI交互设计师',
    salary: '12K-20K',
    updateTime: '2026-04-06',
    tags: ['深圳', '1-3年', '全职'],
    newResumeCount: 0,
    totalApply: 58,
    views: 641
  }
]);

const goToCandidates = (jobId) => {
  router.push({ path: '/recruiter/candidates', query: { jobId } });
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.btn-primary {
  background-color: var(--tea-green, #ccd5ae);
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: opacity 0.3s;
}
.btn-primary:hover {
  opacity: 0.8;
}

.filter-tabs {
  display: flex;
  gap: 30px;
  border-bottom: 1px solid #eee;
  margin-bottom: 24px;
}
.tab {
  padding: 10px 0;
  font-size: 16px;
  color: #666;
  position: relative;
}
.tab.active {
  color: #333;
  font-weight: bold;
}
.tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--tea-green, #ccd5ae);
  border-radius: 2px;
}

.job-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.recruiter-job-card {
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  transition: box-shadow 0.3s, border-color 0.3s;
}
.recruiter-job-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-color: var(--beige, #e9edc9);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.title-group {
  display: flex;
  align-items: center;
  gap: 16px;
}
.job-title {
  margin: 0;
  font-size: 18px;
  color: #333;
}
.job-salary {
  color: #ff6a00;
  font-size: 16px;
  font-weight: 500;
}
.publish-time {
  color: #999;
  font-size: 14px;
}
.job-tags {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.tag {
  background: #f8f8f8;
  color: #666;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}
.job-stats {
  display: flex;
  align-items: center;
  background: var(--cornsilk, #fefae0);
  border-radius: 6px;
  padding: 16px 24px;
  margin-bottom: 20px;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
.stat-num {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}
.stat-num.highlight {
  color: var(--light-bronze, #d4a373);
}
.stat-label {
  font-size: 13px;
  color: #666;
}
.stat-divider {
  width: 1px;
  height: 30px;
  background-color: #e0e0e0;
}
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px dashed #f0f0f0;
  padding-top: 16px;
}
.actions {
  display: flex;
  gap: 20px;
}
.btn-text {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 14px;
}
.btn-text:hover {
  color: var(--light-bronze, #d4a373);
}
.btn-outline {
  background: #fff;
  border: 1px solid var(--tea-green, #ccd5ae);
  color: var(--light-bronze, #d4a373);
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}
.btn-outline:hover {
  background: var(--tea-green, #ccd5ae);
  color: #fff;
}
.pointer {
  cursor: pointer;
}
</style>
