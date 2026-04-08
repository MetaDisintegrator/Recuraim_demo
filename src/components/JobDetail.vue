<template>
  <div class="job-detail">
    <!-- 头部信息 -->
    <div class="detail-header">
      <div class="header-info">
        <div class="info-top">
          <h2 class="job-name">{{ job.title }}</h2>
          <span class="job-salary">{{ job.salary }}</span>
        </div>
        <div class="info-tags">
          <div class="info-tag">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>{{ job.location }}</span>
          </div>
          <div class="info-tag" v-for="tag in coreTags" :key="tag">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            <span>{{ tag }}</span>
          </div>
        </div>
      </div>
      <div class="header-actions">
        <button class="fav-btn" @click="toggleFav">
          <svg v-if="isFavourited" viewBox="0 0 24 24" width="20" height="20" fill="var(--light-bronze)" stroke="var(--light-bronze)" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <span v-if="isFavourited" class="fav-text">已无感收藏</span>
        </button>
        <button class="chat-btn">立刻沟通</button>
      </div>
    </div>

    <!-- AI 匹配分析区域 -->
    <div class="ai-match-section">
      <div class="match-intro" v-if="matchStatus === 'idle'">
        <div class="intro-left">
          <h3>✨ AI 简历匹配度分析</h3>
          <p>评估您的简历与该岗位的契合度，并提供面试建议。</p>
        </div>
        <button class="btn-ai-match" @click="startAnalysis">开始智能评估</button>
      </div>

      <div class="match-analyzing" v-else-if="matchStatus === 'analyzing'">
        <div class="loading-spinner-sm"></div>
        <div class="analyzing-text">
          <p class="analyzing-step">{{ currentStepText }}</p>
          <div class="progress-bar-container">
            <div class="progress-bar" :style="{ width: progress + '%' }"></div>
          </div>
        </div>
      </div>

      <div class="match-result" v-else-if="matchStatus === 'finished'">
        <div class="result-header">
          <div class="score-ring">
            <span class="score-num">{{ aiResult.score }}<small>%</small></span>
          </div>
          <div class="result-summary">
            <h4>{{ aiResult.evaluation }}</h4>
            <p>{{ aiResult.summary }}</p>
          </div>
          <button class="btn-text-re" @click="startAnalysis">重新评估</button>
        </div>
        
        <div class="result-details">
          <div class="detail-column">
            <h5 class="col-title matched">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              已具备优势
            </h5>
            <ul class="detail-list">
              <li v-for="item in aiResult.matched" :key="item">{{ item }}</li>
            </ul>
          </div>
          <div class="detail-column">
            <h5 class="col-title missing">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              薄弱或缺失
            </h5>
            <ul class="detail-list">
              <li v-for="item in aiResult.missing" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 职位详情内容 -->
    <div class="detail-content">
      <div class="company-card">
        <div class="company-avatar">{{ job.company.charAt(0) }}</div>
        <div class="company-info">
          <h4>{{ job.company }}</h4>
          <span>互联网 · 上市公司 · 1000-9999人</span>
        </div>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ccc" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </div>

      <div class="section">
        <h3 class="section-title">职位描述</h3>
        <div class="jd-text">
          <p v-for="(paragraph, index) in descriptionParagraphs" :key="index">{{ paragraph }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  job: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

const isFavourited = ref(false);
const toggleFav = () => isFavourited.value = !isFavourited.value;

const coreTags = computed(() => {
  return props.job.tags ? props.job.tags.filter(t => t !== props.job.location) : [];
});

const descriptionParagraphs = computed(() => {
  if (Array.isArray(props.job.description)) {
    return props.job.description;
  }
  return props.job.description ? props.job.description.split('\n') : ['暂无职位描述详细信息'];
});

// AI匹配状态控制
const matchStatus = ref('idle'); // idle | analyzing | finished
const progress = ref(0);
const currentStepText = ref('');

const analyzeSteps = [
  "正在读取岗位 Job Description...",
  "正在加载您的默认在线简历...",
  "正在进行技能词谱交叉对比...",
  "正在评估工作经验适配度...",
  "生成最终核心建议报告..."
];

const aiResult = ref({
  score: 85,
  evaluation: '高度匹配',
  summary: '您的背景与该岗位整体非常吻合。尤其是技术栈一致性高。建议在面试中主动展示相关历史成果。',
  matched: ['熟练掌握核心相关技术栈', '过往经验与业务匹配', '教育背景符合公司预期'],
  missing: ['JD中提到期待有独立主导项目经验', '缺少跨部门沟通协调的具体案例']
});

watch(() => props.job.id, () => {
  matchStatus.value = 'idle';
  isFavourited.value = false;
});

const startAnalysis = () => {
  matchStatus.value = 'analyzing';
  progress.value = 0;
  let stepIndex = 0;
  
  const timer = setInterval(() => {
    progress.value += Math.random() * 20;
    
    if (progress.value >= (stepIndex + 1) * 20 && stepIndex < analyzeSteps.length) {
      currentStepText.value = analyzeSteps[stepIndex];
      stepIndex++;
    }

    if (progress.value >= 100) {
      clearInterval(timer);
      progress.value = 100;
      setTimeout(() => {
        // 根据职位标题做简单的 mock 分数变化
        if (props.job.title.includes('高级') || props.job.title.includes('架构')) {
          aiResult.value.score = 68;
          aiResult.value.evaluation = '部分匹配';
          aiResult.value.summary = '该岗位偏向资深专家或架构设计，建议在能力图谱上重点补强系统全局设计经验。';
          aiResult.value.missing = ['缺乏大规模并发场景架构设计经验', '技术深度体现较少'];
        } else {
          aiResult.value.score = 92;
          aiResult.value.evaluation = '极度匹配';
          aiResult.value.summary = '非常推荐您投递此职位。您的技能栈及过往项目复杂程度与招聘方需求高度贴合。';
          aiResult.value.missing = ['可以补充一些量化数据（如提升效率xx%）以增加说服力'];
        }
        matchStatus.value = 'finished';
      }, 400);
    }
  }, 250);
};
</script>

<style scoped>
.job-detail {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  overflow: hidden;
}

/* 头部 */
.detail-header {
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
}
.info-top {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}
.job-name {
  margin: 0;
  font-size: 22px;
  font-weight: bold;
  color: #333;
}
.job-salary {
  font-size: 18px;
  color: #ff6a00;
  font-weight: 500;
}
.info-tags {
  display: flex;
  gap: 16px;
}
.info-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  font-size: 14px;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.fav-btn {
  background: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  transition: all 0.2s;
}
.fav-btn:hover {
  border-color: var(--light-bronze, #d4a373);
}
.fav-text {
  font-size: 13px;
  color: var(--light-bronze, #d4a373);
}
.chat-btn {
  background-color: var(--tea-green, #ccd5ae);
  color: #333;
  font-weight: bold;
  border: none;
  padding: 10px 24px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}
.chat-btn:hover {
  background-color: var(--beige, #e9edc9);
}

/* AI 分析区 */
.ai-match-section {
  background: var(--cornsilk, #fefae0);
  border-bottom: 2px solid var(--beige, #e9edc9);
  padding: 20px 24px;
  flex-shrink: 0;
}
.match-intro {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.intro-left h3 {
  margin: 0 0 4px 0;
  color: #333;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.intro-left p {
  margin: 0;
  color: #666;
  font-size: 13px;
}
.btn-ai-match {
  background: #fff;
  border: 1px solid var(--light-bronze, #d4a373);
  color: var(--light-bronze, #d4a373);
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}
.btn-ai-match:hover {
  background: var(--light-bronze, #d4a373);
  color: #fff;
}

/* 加载动画状态 */
.match-analyzing {
  display: flex;
  align-items: center;
  gap: 16px;
}
.loading-spinner-sm {
  width: 24px;
  height: 24px;
  border: 3px solid var(--beige, #e9edc9);
  border-top-color: var(--light-bronze, #d4a373);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin { 100% { transform: rotate(360deg); } }
.analyzing-text {
  flex: 1;
}
.analyzing-step {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: var(--light-bronze, #d4a373);
  font-weight: bold;
}
.progress-bar-container {
  width: 100%;
  height: 6px;
  background: #fff;
  border-radius: 3px;
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  background: var(--tea-green, #ccd5ae);
  transition: width 0.3s ease;
}

/* 结果展现状态 */
.match-result {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.result-header {
  display: flex;
  align-items: center;
  gap: 16px;
}
.score-ring {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #fff;
  border: 4px solid var(--tea-green, #ccd5ae);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
}
.score-num {
  font-size: 20px;
  font-weight: bold;
}
.result-summary {
  flex: 1;
}
.result-summary h4 {
  margin: 0 0 4px 0;
  color: #333;
  font-size: 16px;
}
.result-summary p {
  margin: 0;
  color: #555;
  font-size: 13px;
  line-height: 1.5;
}
.btn-text-re {
  background: none;
  border: none;
  color: var(--light-bronze, #d4a373);
  cursor: pointer;
  font-size: 13px;
  text-decoration: underline;
}

.result-details {
  display: flex;
  gap: 16px;
  background: #fff;
  padding: 16px;
  border-radius: 8px;
}
.detail-column {
  flex: 1;
}
.col-title {
  margin: 0 0 10px 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.col-title.matched { color: #38a169; }
.col-title.missing { color: #e53e3e; }
.detail-list {
  margin: 0;
  padding: 0 0 0 20px;
  font-size: 13px;
  color: #555;
  line-height: 1.6;
}
.detail-list li { margin-bottom: 4px; }

/* 内容区 */
.detail-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}
.company-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #fafbfc;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  margin-bottom: 24px;
  cursor: pointer;
  transition: background 0.2s;
}
.company-card:hover {
  background: #f0f0f0;
}
.company-avatar {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: var(--light-bronze, #d4a373);
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
.company-info {
  flex: 1;
}
.company-info h4 {
  margin: 0 0 4px 0;
  font-size: 16px;
  color: #333;
}
.company-info span {
  font-size: 13px;
  color: #888;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
  border-left: 4px solid var(--tea-green, #ccd5ae);
  padding-left: 10px;
}
.jd-text p {
  color: #555;
  font-size: 14px;
  line-height: 1.8;
  margin-bottom: 12px;
}
</style>