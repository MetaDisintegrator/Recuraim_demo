<template>
  <div class="resume-container">
    <!-- 状态 1：未上传状态 -->
    <div class="upload-section" v-if="status === 'idle'">
      <div class="upload-box" @click="simulateUpload" @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false" @drop.prevent="simulateUpload" :class="{ 'is-dragging': isDragging }">
        <div class="upload-icon">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--light-bronze)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </div>
        <h3>点击或将简历文件拖拽到此处</h3>
        <p>支持 PDF, DOCX, 图片 格式 (最大 10MB)</p>
        <div class="test-tip">（这是一个Demo，点击此区域即可模拟上传并让AI解析）</div>
      </div>
    </div>

    <!-- 状态 2：AI 加载解析中 -->
    <div class="analyzing-section" v-else-if="status === 'analyzing'">
      <div class="loading-spinner"></div>
      <h3 class="analyzing-title">AI 正在深度解析您的简历...</h3>
      <p class="analyzing-step">{{ currentStepText }}</p>
      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      </div>
    </div>

    <!-- 状态 3：解析完成与AI建议 (双栏结构) -->
    <div class="result-section" v-else-if="status === 'finished'">
      <div class="header-action">
        <h2>智能简历分析报告</h2>
        <button class="btn-outline" @click="resetUpload">重新上传</button>
      </div>

      <div class="result-layout">
        <!-- 左侧：结构化简历档案 -->
        <div class="resume-card">
          <div class="resume-header">
            <div class="avatar-lg">{{ resumeData.name.charAt(0) }}</div>
            <div class="basic-info">
              <h3>{{ resumeData.name }}</h3>
              <p>{{ resumeData.experience }} · {{ resumeData.education }} · {{ resumeData.phone }}</p>
              <div class="skill-tags">
                <span class="tag" v-for="tag in resumeData.skills" :key="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
          <div class="resume-body">
            <div class="resume-block">
              <h4 class="block-title">求职意向</h4>
              <p>{{ resumeData.intent }} | {{ resumeData.expectedSalary }} | {{ resumeData.location }}</p>
            </div>
            <div class="resume-block">
              <h4 class="block-title">工作经历</h4>
              <div class="exp-item" v-for="(exp, index) in resumeData.workExps" :key="index">
                <div class="exp-head">
                  <strong>{{ exp.company }}</strong>
                  <span class="exp-time">{{ exp.time }}</span>
                </div>
                <div class="exp-role">{{ exp.role }}</div>
                <p class="exp-desc" :class="{ 'highlight-update': exp.isUpdated }">{{ exp.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：AI 分析与优化建议 -->
        <div class="ai-advice-card">
          <div class="score-board">
            <div class="score-circle">
              <span class="score-num">{{ aiAdvice.score }}</span>
              <span class="score-text">综合评分</span>
            </div>
            <div class="score-eval">
              <h4>{{ aiAdvice.evaluation }}</h4>
              <p>您的简历结构清晰，但由于缺乏数据支撑，在竞争力上仍有提升空间。</p>
            </div>
          </div>

          <div class="advice-block">
            <h4 class="advice-title">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="var(--light-bronze)" stroke="var(--light-bronze)" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              关键词补全预警
            </h4>
            <div class="keyword-tags">
              <span class="kw-tag missing" v-for="kw in aiAdvice.missingKeywords" :key="kw">+ 补充 "{{ kw }}"</span>
            </div>
          </div>

          <div class="advice-block highlight-block" v-if="!isReAnalyzed">
            <h4 class="advice-title">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--light-bronze)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              STAR 法则表达优化
            </h4>
            <div class="compare-box">
              <div class="compare-original">
                <span class="label">原描述：</span>
                <p>{{ aiAdvice.rewriteSuggestion.original }}</p>
              </div>
              <div class="compare-suggested">
                <span class="label ai-label">✨ AI 建议：</span>
                <p>{{ aiAdvice.rewriteSuggestion.suggested }}</p>
              </div>
            </div>
            
            <div class="action-group">
              <button 
                class="btn-primary adopt-btn" 
                @click="adoptSuggestion" 
                :disabled="resumeData.workExps[0].isUpdated"
              >
                {{ resumeData.workExps[0].isUpdated ? '已采纳建议并同步至简历' : '一键采纳该建议' }}
              </button>
              
              <button 
                v-if="resumeData.workExps[0].isUpdated"
                class="btn-outline reanalyze-btn" 
                @click="reAnalyze"
              >
                触发重新分析
              </button>
            </div>
          </div>

          <!-- 重新分析后无更多建议的占位卡片 -->
          <div class="advice-block highlight-block" v-else>
            <h4 class="advice-title" style="color: var(--light-bronze, #d4a373);">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              暂无更多优化建议
            </h4>
            <p style="font-size: 14px; color: #666; line-height: 1.6; margin: 0;">
              您的简历已非常完善，结构清晰并充满数据支撑，核心竞争力显著提升。目前系统已无法找出更多需要改写的地方。<br/><br/>
              您可以尝试直接将这份优质简历投递给心仪的岗位！
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const status = ref('idle'); // idle | analyzing | finished
const isDragging = ref(false);
const progress = ref(0);
const currentStepText = ref('');
const isReAnalyzed = ref(false);

const analyzeSteps = [
  "正在读取文档与 OCR 识别...",
  "正在抽取个人基础信息...",
  "正在进行工作经历层级切分...",
  "正在提取核心技能图谱...",
  "大模型正在进行岗位标准比对与重写...",
  "分析完成，正在生成增强报告！"
];

// Mock 数据
const resumeData = ref({
  name: '王小明',
  experience: '3年经验',
  education: '某大学 · 计算机科学 · 本科',
  phone: '138****8888',
  intent: '前端开发工程师',
  expectedSalary: '15K-20K',
  location: '北京',
  skills: ['Vue3', 'JavaScript', 'TypeScript', 'Webpack', 'CSS3'],
  workExps: [
    {
      company: '某互联网科技有限公司',
      time: '2021.07 - 至今',
      role: '前端开发工程师',
      desc: '负责公司内部管理系统的开发。参与了重构工作，把老项目迁移到了 Vue3。平时负责页面组件的编写和后端的接口对接。',
      isUpdated: false
    }
  ]
});

const aiAdvice = ref({
  score: 78,
  evaluation: '良好，超越 65% 的求职者',
  missingKeywords: ['微前端', '性能优化', 'Vite', 'CI/CD'],
  rewriteSuggestion: {
    original: '负责公司内部管理系统的开发。参与了重构工作，把老项目迁移到了 Vue3。平时负责页面组件的编写和后端的接口对接。',
    suggested: '主导核心中后台管理系统的架构升级，将技术栈从 Vue2 平滑迁移至 Vue3 + Vite。通过提取公共组件库，使前端开发效率提升30%；主导性能优化，首屏加载时间缩短 40%。'
  }
});

const simulateUpload = () => {
  status.value = 'analyzing';
  progress.value = 0;
  let stepIndex = 0;
  
  const timer = setInterval(() => {
    progress.value += Math.random() * 15;
    
    if (progress.value >= (stepIndex + 1) * 16.6 && stepIndex < analyzeSteps.length) {
      currentStepText.value = analyzeSteps[stepIndex];
      stepIndex++;
    }

    if (progress.value >= 100) {
      clearInterval(timer);
      progress.value = 100;
      setTimeout(() => {
        status.value = 'finished';
      }, 400);
    }
  }, 300);
};

const adoptSuggestion = () => {
  // 用 AI 生成的语句替换掉原有的语句
  resumeData.value.workExps[0].desc = aiAdvice.value.rewriteSuggestion.suggested;
  resumeData.value.workExps[0].isUpdated = true;
};

const reAnalyze = () => {
  status.value = 'analyzing';
  progress.value = 0;
  let stepIndex = 0;
  
  const timer = setInterval(() => {
    progress.value += Math.random() * 20; // 稍微加快点速度
    
    if (progress.value >= (stepIndex + 1) * 16.6 && stepIndex < analyzeSteps.length) {
      currentStepText.value = analyzeSteps[stepIndex];
      stepIndex++;
    }

    if (progress.value >= 100) {
      clearInterval(timer);
      progress.value = 100;
      setTimeout(() => {
        status.value = 'finished';
        isReAnalyzed.value = true;
        // 模拟重新分析后的更好结果
        aiAdvice.value.score = 92;
        aiAdvice.value.evaluation = '表现卓越，超越 95% 的求职者';
        aiAdvice.value.missingKeywords = [];
      }, 400);
    }
  }, 200);
};

const resetUpload = () => {
  status.value = 'idle';
  progress.value = 0;
  isReAnalyzed.value = false;
  resumeData.value.workExps[0].desc = aiAdvice.value.rewriteSuggestion.original;
  resumeData.value.workExps[0].isUpdated = false;
  aiAdvice.value.score = 78;
  aiAdvice.value.evaluation = '良好，超越 65% 的求职者';
  aiAdvice.value.missingKeywords = ['微前端', '性能优化', 'Vite', 'CI/CD'];
};
</script>

<style scoped>
.resume-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  min-height: calc(100vh - 60px);
}

/* ==== 拖拽上传区 ==== */
.upload-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
}
.upload-box {
  width: 600px;
  padding: 80px 40px;
  border: 2px dashed var(--tea-green, #ccd5ae);
  background-color: #fafbfc;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}
.upload-box:hover, .upload-box.is-dragging {
  border-color: var(--light-bronze, #d4a373);
  background-color: var(--cornsilk, #fefae0);
}
.upload-icon {
  margin-bottom: 20px;
  color: var(--light-bronze, #d4a373);
}
.upload-box h3 {
  color: #333;
  margin-bottom: 10px;
  font-size: 20px;
}
.upload-box p {
  color: #888;
  font-size: 14px;
  margin-bottom: 20px;
}
.test-tip {
  display: inline-block;
  background: var(--papaya-whip, #faedcd);
  color: var(--light-bronze, #d4a373);
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
}

/* ==== 加载动画区 ==== */
.analyzing-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
}
.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--beige, #e9edc9);
  border-top-color: var(--light-bronze, #d4a373);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 24px;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
.analyzing-title {
  color: #333;
  font-size: 22px;
  margin-bottom: 12px;
}
.analyzing-step {
  color: var(--light-bronze, #d4a373);
  font-size: 15px;
  margin-bottom: 30px;
  height: 20px;
}
.progress-bar-container {
  width: 400px;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  background: var(--tea-green, #ccd5ae);
  transition: width 0.3s ease;
}

/* ==== 解析完成：双栏结果区 ==== */
.header-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.header-action h2 {
  color: #333;
  margin: 0;
}
.btn-outline {
  background: transparent;
  border: 1px solid var(--light-bronze, #d4a373);
  color: var(--light-bronze, #d4a373);
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-outline:hover {
  background: var(--light-bronze, #d4a373);
  color: #fff;
}
.result-layout {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

/* 左侧：简历试图 */
.resume-card {
  flex: 1;
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}
.resume-header {
  display: flex;
  gap: 20px;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 2px solid var(--beige, #e9edc9);
  margin-bottom: 24px;
}
.avatar-lg {
  width: 80px;
  height: 80px;
  background: var(--tea-green, #ccd5ae);
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.basic-info h3 {
  margin: 0 0 8px 0;
  font-size: 24px;
  color: #333;
}
.basic-info p {
  color: #666;
  margin: 0 0 12px 0;
  font-size: 15px;
}
.skill-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.tag {
  background: var(--cornsilk, #fefae0);
  color: #555;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
}
.resume-block {
  margin-bottom: 30px;
}
.block-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 16px;
  padding-left: 10px;
  border-left: 4px solid var(--tea-green, #ccd5ae);
}
.exp-item {
  margin-bottom: 20px;
}
.exp-head {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #333;
  margin-bottom: 6px;
}
.exp-time {
  color: #999;
  font-size: 14px;
}
.exp-role {
  color: #666;
  font-size: 15px;
  margin-bottom: 8px;
}
.exp-desc {
  color: #555;
  font-size: 14px;
  line-height: 1.6;
  transition: all 0.5s;
}
.highlight-update {
  background-color: var(--cornsilk, #fefae0);
  padding: 8px;
  border-radius: 4px;
  border-left: 3px solid var(--light-bronze, #d4a373);
}

/* 右侧：AI 建议面板 */
.ai-advice-card {
  width: 380px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.score-board {
  background: var(--cornsilk, #fefae0);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.score-circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 4px solid var(--light-bronze, #d4a373);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
}
.score-num {
  font-size: 28px;
  font-weight: bold;
  color: var(--light-bronze, #d4a373);
  line-height: 1;
}
.score-text {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  white-space: nowrap;
}
.score-eval h4 {
  margin: 0 0 6px 0;
  color: #333;
  font-size: 16px;
}
.score-eval p {
  margin: 0;
  font-size: 13px;
  color: #666;
  line-height: 1.5;
}

.advice-block {
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 20px;
}
.advice-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px 0;
  color: #333;
  font-size: 16px;
}
.keyword-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.kw-tag.missing {
  background: #fff5f5;
  color: #e53e3e;
  border: 1px dashed #feb2b2;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
}

.highlight-block {
  border-color: var(--beige, #e9edc9);
}
.compare-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}
.label {
  font-size: 13px;
  font-weight: bold;
  color: #777;
  margin-bottom: 4px;
  display: block;
}
.ai-label {
  color: var(--light-bronze, #d4a373);
}
.compare-original p {
  margin: 0;
  font-size: 13px;
  color: #888;
  text-decoration: line-through;
  background: #f9f9f9;
  padding: 8px;
  border-radius: 4px;
}
.compare-suggested p {
  margin: 0;
  font-size: 14px;
  color: #333;
  background: var(--cornsilk, #fefae0);
  padding: 10px;
  border-radius: 4px;
  border-left: 3px solid var(--light-bronze, #d4a373);
  line-height: 1.5;
}

.action-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}
.btn-outline.reanalyze-btn {
  width: 100%;
  padding: 12px;
  font-weight: bold;
}

.btn-primary.adopt-btn {
  width: 100%;
  background-color: var(--tea-green, #ccd5ae);
  color: #333;
  border: none;
  font-weight: bold;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}
.btn-primary.adopt-btn:hover:not(:disabled) {
  background-color: var(--light-bronze, #d4a373);
  color: #fff;
}
.btn-primary.adopt-btn:disabled {
  background-color: #eee;
  color: #aaa;
  cursor: not-allowed;
}
</style>