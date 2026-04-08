<template>
  <div class="job-detail">
    <!-- 当job为null时显示占位内容 -->
    <div v-if="!job" class="job-detail-empty">
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="var(--tea-green, #ccd5ae)" stroke-width="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"></path>
      </svg>
      <p>请点击左侧卡片查看职位详情</p>
    </div>
    
    <!-- 当job不为null时显示职位详情 -->
    <div v-else>
      <!-- 头部信息 -->
      <div class="job-detail-header">
        <!-- 第一行：职位名称和薪资 -->
        <div class="job-title-section">
          <div class="job-title-container">
            <h3 class="job-title">{{ job.title }}</h3>
          </div>
          <span class="job-salary">{{ job.salary }}</span>
        </div>
        
        <!-- 第二行：tag和action -->
        <div class="job-secondary-section">
          <div class="job-tags-important">
            <span class="tag-important">
              <img src="../assets/icons/location2.png" alt="location" class="tag-icon">
              {{ job.location }}
            </span>
            <span class="tag-important">
              <img src="../assets/icons/exp.png" alt="experience" class="tag-icon">
              {{ job.experience }}
            </span>
            <span class="tag-important">
              <img src="../assets/icons/knowledge.png" alt="education" class="tag-icon">
              {{ job.education }}
            </span>
          </div>
          <div class="job-actions">
            <button class="favourite-btn" @click="toggleFavourite">
              <img v-if="!isFavourited" src="../assets/icons/favourite.png" alt="favourite" class="favourite-icon">
              <img v-else src="../assets/icons/favourited.png" alt="favourite" class="favourite-icon">
              <span>{{ isFavourited ? '已收藏' : '收藏' }}</span>
            </button>
            <button class="contact-btn">立刻沟通</button>
          </div>
        </div>
      </div>
      
      <!-- 内容区 -->
      <div class="job-detail-content">
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

        <h4 class="section-title">职位描述</h4>
        <div class="job-description" v-html="(job.description || '暂无职位描述详细信息').replace(/\n/g, '<br>')"></div>
        
        <h4 class="section-title">发布人信息</h4>
        <div class="publisher-info">
          <div class="publisher-avatar">{{ (job.company || '?').charAt(0) }}</div>
          <div class="publisher-details">
            <span class="publisher-name">{{ job.company || '未知公司' }}</span>
            <span class="publisher-status">在线</span>
          </div>
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
    required: false,
    default: null
  }
});

const isFavourited = ref(false);
const toggleFavourite = () => isFavourited.value = !isFavourited.value;

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

watch(() => props.job?.id, () => {
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
        if (props.job && (props.job.title?.includes('高级') || props.job.title?.includes('架构'))) {
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
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  position: sticky;
  top: 100px;
}

.job-detail:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.job-detail-header {
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(135deg, var(--cornsilk), rgba(254, 250, 224, 0.8));
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 16px 16px 0 0;
  flex-shrink: 0;
}

.job-secondary-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.job-title-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.job-title-section > .job-title-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.job-title {
  font-size: 22px;
  font-weight: bold;
  margin: 0;
  color: #333;
  transition: color 0.3s;
  line-height: 1.4;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
}

.job-salary {
  color: var(--light-bronze);
  font-weight: bold;
  font-size: 18px;
  background-color: rgba(192, 146, 99, 0.1);
  padding: 5px 10px;
  margin: 6px 0;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(192, 146, 99, 0.2);
}

.job-tags-important {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag-important {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  margin: 6px 0;
  border-radius: 10px;
  font-size: 14px;
  color: #666;
  background-color: rgba(233, 237, 201, 0.7);
  transition: all 0.3s;
  border: 1px solid rgba(233, 237, 201, 0.5);
}

.tag-icon {
  width: 16px;
  height: 16px;
  filter: brightness(0.6);
  transition: all 0.3s;
}

.job-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.favourite-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  margin: 6px 0;
  background-color: transparent;
  border: 2px solid var(--light-bronze);
  border-radius: 10px;
  color: var(--light-bronze);
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.favourite-btn:hover {
  background-color: var(--light-bronze);
  color: white;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(192, 146, 99, 0.3);
}

.favourite-icon {
  width: 16px;
  height: 16px;
  transition: all 0.3s;
}

.favourite-btn:hover .favourite-icon {
  transform: scale(1.1);
  filter: brightness(0) invert(1);
}

.contact-btn {
  padding: 8px 18px;
  margin: 6px 0;
  background-color: var(--light-bronze);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(192, 146, 99, 0.3);
}

.contact-btn:hover {
  background-color: #c09263;
  transform: scale(1.08);
  box-shadow: 0 6px 20px rgba(192, 146, 99, 0.4);
}

.job-detail-content {
  padding: 24px;
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  max-height: calc(100vh - 300px);
}

.job-detail-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 16px;
  color: var(--light-bronze);
  position: relative;
  padding-bottom: 8px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, var(--light-bronze), rgba(192, 146, 99, 0.5));
  border-radius: 2px;
}

.job-description {
  margin-bottom: 24px;
  line-height: 1.6;
  color: #666;
  padding: 20px;
  background-color: rgba(254, 250, 224, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(233, 237, 201, 0.5);
}

.job-description p {
  margin-bottom: 12px;
}

.publisher-info {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, var(--cornsilk), rgba(254, 250, 224, 0.8));
  border-radius: 12px;
  transition: all 0.3s;
  border: 1px solid rgba(233, 237, 201, 0.5);
}

.publisher-info:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.publisher-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--tea-green);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--light-bronze);
  font-size: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.publisher-details {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.publisher-name {
  font-weight: 600;
  color: #333;
  font-size: 16px;
  transition: color 0.3s;
}

.publisher-info:hover .publisher-name {
  color: var(--light-bronze);
}

.publisher-status {
  font-size: 13px;
  color: #4CAF50;
  background-color: rgba(76, 175, 80, 0.1);
  padding: 4px 12px;
  border-radius: 15px;
  align-self: flex-start;
  font-weight: 500;
}

/* 空状态样式 */
.job-detail-empty {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
  padding: 40px 20px;
  text-align: center;
}

.job-detail-empty svg {
  margin-bottom: 16px;
  opacity: 0.6;
}

.job-detail-empty p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
}

/* AI 分析区 */
.ai-match-section {
  background: var(--cornsilk, #fefae0);
  border-bottom: 2px solid var(--beige, #e9edc9);
  padding: 20px 24px;
  flex-shrink: 0;
  margin-bottom: 24px;
  border-radius: 12px;
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
</style>