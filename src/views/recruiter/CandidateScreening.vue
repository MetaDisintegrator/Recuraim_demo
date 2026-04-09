<template>
  <div class="candidate-screening container">
    <!-- 顶部拓展栏(二层) 快捷筛选tag区 -->
    <div class="filter-bar">
      <div class="filter-item pointer has-dropdown" v-for="filter in filters" :key="filter.id">
        <span>{{ filter.label }}</span>
        <svg class="icon-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </div>
    </div>

    <!-- 页面主体 -->
    <div class="screening-layout">
      <!-- 职位卡片区 (这里是候选人列表) -->
      <div class="candidate-list">
        <div 
          class="candidate-card pointer" 
          v-for="cand in candidates" 
          :key="cand.id"
          :class="{ 'is-selected': selectedCandidate && selectedCandidate.id === cand.id }"
          @click="selectCandidate(cand)"
        >
          <div class="card-top">
            <div class="cand-info-wrapper">
              <div class="avatar-sm">{{ cand.name.charAt(0) }}</div>
              <div class="cand-brief">
                <h4 class="cand-name">{{ cand.name }}</h4>
                <span class="cand-target">{{ cand.expectedRole }}</span>
              </div>
            </div>
            <div class="match-score">匹配度: {{ cand.matchScore }}%</div>
          </div>
          
          <div class="cand-tags">
            <span class="tag">{{ cand.experience }}</span>
            <span class="tag">{{ cand.education }}</span>
            <span class="tag">{{ cand.expectedSalary }}</span>
          </div>

          <div class="cand-desc">
            {{ cand.advantage.substring(0, 40) }}...
          </div>
        </div>
      </div>

      <!-- 职位详情区 (这里是简历详情，固定于右侧) -->
      <div class="resume-detail-wrapper">
        <ResumeDetail v-if="selectedCandidate" :candidate="selectedCandidate" />
        <div v-else class="empty-state">
          <div class="empty-icon">📂</div>
          <p>请在左侧选择一个候选人查看详细简历</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ResumeDetail from '../../components/ResumeDetail.vue';

const filters = ref([
  { id: 1, label: '求职状态' },
  { id: 2, label: '薪资要求' },
  { id: 3, label: '工作经验' },
  { id: 4, label: '学历要求' },
  { id: 5, label: '当前公司行业' }
]);

const candidates = ref([
  {
    id: 1,
    name: '张三',
    expectedRole: '前端开发工程师',
    matchScore: 95,
    expectedSalary: '18K-25K',
    location: '上海',
    experience: '3年经验',
    education: '本科',    techTags: ['Vue3', 'React', 'Vite', 'Webpack', '前端工程化'],    advantage: '熟练掌握 Vue3、React 及其生态，主导过多个大型中后台管理系统的开发重构。对前端性能优化、工程化有深入理解，具有良好的沟通能力和团队协作精神。',
    workExps: [
      { id: 1, company: '某互联网大厂', time: '2023.06 - 至今', role: '高级前端工程师', desc: '负责核心业务前端架构设计与开发，推动 Vite 接入，提升构建速度40%。' },
      { id: 2, company: '某创业公司', time: '2021.07 - 2023.05', role: '前端开发工程师', desc: '参与从0到1搭建招聘平台，实现并优化各类复杂交互动效。' }
    ]
  },
  {
    id: 2,
    name: '李四',
    expectedRole: '全栈开发工程师',
    matchScore: 88,
    expectedSalary: '20K-30K',
    location: '北京',
    experience: '5年经验',
    education: '硕士',
    techTags: ['JavaScript', 'Node.js', '微服务', 'NestJS', '全栈开发'],
    advantage: '精通 JavaScript 与 Node.js，具有全栈开发经验。熟悉基于微服务架构的分布式系统，善于排查线上疑难杂症。',
    workExps: [
      { id: 1, company: '某科技公司', time: '2020.08 - 至今', role: '全栈工程师', desc: '负责用户端和管理端的前后端开发，独立承担了求职问答模块的搭建。' }
    ]
  },
  {
    id: 3,
    name: '王五',
    expectedRole: 'Vue开发工程师',
    matchScore: 82,
    expectedSalary: '15K-20K',
    location: '深圳',
    experience: '2年经验',
    education: '本科',
    techTags: ['Vue2', 'Vue3', 'HTML/CSS', 'ECharts', '响应式布局'],
    advantage: '扎实的 HTML/CSS/JS 基础，熟悉 Vue 体系，对响应式原理有深入研究。能熟练使用各种前端常用工具链。',
    workExps: [
      { id: 1, company: '某设计公司', time: '2024.01 - 至今', role: '前端工程师', desc: '负责各类互动H5和大屏活动页面的开发工作。' }
    ]
  }
]);

const selectedCandidate = ref(candidates.value[0]);

const selectCandidate = (cand) => {
  selectedCandidate.value = cand;
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 顶部筛选栏 */
.filter-bar {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}
.filter-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: #f8f8f8;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  transition: all 0.3s;
}
.filter-item:hover {
  background: var(--tea-green, #ccd5ae);
  color: #333;
  font-weight: bold;
}
.filter-item:hover .icon-arrow {
  transform: rotate(180deg);
}
.icon-arrow {
  transition: transform 0.3s;
}

/* 主体布局 */
.screening-layout {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

/* 左侧候选人列表 */
.candidate-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.candidate-card {
  background: #fff;
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: all 0.3s;
}
.candidate-card:hover {
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
}
.candidate-card.is-selected {
  border-color: var(--tea-green, #ccd5ae);
  background-color: #fafbfc;
}
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.cand-info-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}
.avatar-sm {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--light-bronze, #d4a373);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
}
.cand-brief {
  display: flex;
  flex-direction: column;
}
.cand-name {
  margin: 0;
  font-size: 16px;
  color: #333;
}
.cand-target {
  font-size: 13px;
  color: #777;
  margin-top: 2px;
}
.match-score {
  color: var(--light-bronze, #d4a373);
  font-weight: bold;
  font-size: 15px;
}
.cand-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
.tag {
  background: var(--beige, #e9edc9);
  color: #555;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}
.cand-desc {
  font-size: 13px;
  color: #888;
  line-height: 1.5;
}

/* 右侧简历详情浮窗 */
.resume-detail-wrapper {
  flex-shrink: 0;
  width: 420px;
  height: calc(100vh - 140px); /* 视口高度减去顶部 */
  position: sticky;
  top: 80px;
}
.empty-state {
  height: 100%;
  background: #fff;
  border: 1px dashed #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
}
.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}
.pointer {
  cursor: pointer;
}
</style>
