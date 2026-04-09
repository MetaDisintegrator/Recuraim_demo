<template>
  <div class="post-job-page container">
    <div class="post-header">
      <h2>发布新职位</h2>
      <p>填写职位信息并发布，系统将为您精准匹配优质候选人</p>
    </div>

    <div class="form-container">
      <form class="post-form" @submit.prevent="submitJob">
        <!-- 基础信息模块 -->
        <div class="form-section">
          <h3 class="section-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            基础信息
          </h3>
          <div class="form-row">
            <div class="form-group flex-2">
              <label for="title">职位名称 <span class="required">*</span></label>
              <input type="text" id="title" v-model="formData.title" placeholder="例如：高级前端开发工程师" required />
            </div>
            <div class="form-group flex-1">
              <label for="type">职位类型 <span class="required">*</span></label>
              <select id="type" v-model="formData.type">
                <option value="全职">全职</option>
                <option value="兼职">兼职</option>
                <option value="实习">实习</option>
              </select>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="salary">薪资范围 <span class="required">*</span></label>
              <select id="salary" v-model="formData.salary">
                <option value="10k以下">10k 以下</option>
                <option value="10-20k">10k - 20k</option>
                <option value="20-30k">20k - 30k</option>
                <option value="30-50k">30k - 50k</option>
                <option value="50k以上">50k 以上</option>
              </select>
            </div>
            <div class="form-group flex-1">
              <label for="location">工作地点 <span class="required">*</span></label>
              <input type="text" id="location" v-model="formData.location" placeholder="例如：北京 朝阳区" required />
            </div>
          </div>
        </div>

        <!-- 要求与标签模块 -->
        <div class="form-section">
          <h3 class="section-title">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
            岗位要求
          </h3>
          <div class="form-row">
            <div class="form-group flex-1">
              <label for="experience">工作经验</label>
              <select id="experience" v-model="formData.experience">
                <option value="不限">经验不限</option>
                <option value="在校/应届">在校/应届</option>
                <option value="1-3年">1-3年</option>
                <option value="3-5年">3-5年</option>
                <option value="5-10年">5-10年</option>
                <option value="10年以上">10年以上</option>
              </select>
            </div>
            <div class="form-group flex-1">
              <label for="education">最低学历</label>
              <select id="education" v-model="formData.education">
                <option value="不限">学历不限</option>
                <option value="大专">大专</option>
                <option value="本科">本科</option>
                <option value="硕士">硕士</option>
                <option value="博士">博士</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>亮点标签（展示给求职者的特色福利，选填）</label>
            <div class="tags-container">
              <div 
                v-for="(tag, index) in availableTags" 
                :key="index" 
                class="selectable-tag"
                :class="{ selected: formData.tags.includes(tag) }"
                @click="toggleTag(tag)"
              >
                {{ tag }}
              </div>
            </div>
          </div>
        </div>

        <!-- 详细描述模块 -->
        <div class="form-section">
          <div class="section-title-wrap">
            <h3 class="section-title">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              职位描述 (Job Description)
              <span class="required">*</span>
            </h3>
            <button type="button" class="btn-ai-optimize" @click="mockAIOptimize" :disabled="isOptimizing">
              <span v-if="!isOptimizing">✨ AI 一键润色JD</span>
              <span v-else class="optimizing-text">润色中 <span class="dots">...</span></span>
            </button>
          </div>
          <div class="form-group">
            <textarea 
              id="description" 
              v-model="formData.description" 
              rows="8" 
              placeholder="请输入职位要求、工作内容等详细信息...建议分点列出"
              required></textarea>
          </div>
        </div>

        <!-- 提交按钮 -->
        <div class="form-actions">
          <button type="button" class="btn-cancel" @click="$router.push('/recruiter/jobs')">取消发布</button>
          <button type="submit" class="btn-submit" :disabled="isSubmitting">
            {{ isSubmitting ? '发布中...' : '确认发布此职位' }}
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- 发布成功的 Toast 提示 -->
  <div class="toast-overlay" v-if="showToast">
    <div class="toast">
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#60a5fa" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <div class="toast-content">
        <h4>发布成功</h4>
        <p>您的职位已上线并开始为您智能匹配候选人</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = ref({
  title: '',
  type: '全职',
  salary: '20-30k',
  location: '',
  experience: '3-5年',
  education: '本科',
  tags: [],
  description: ''
});

const availableTags = ['五险一金', '年底双薪', '绩效奖金', '股票期权', '带薪年假', '弹性工作', '免费三餐', '扁平管理', '交通补助'];

const isOptimizing = ref(false);
const isSubmitting = ref(false);
const showToast = ref(false);

const toggleTag = (tag) => {
  const index = formData.value.tags.indexOf(tag);
  if (index > -1) {
    formData.value.tags.splice(index, 1);
  } else {
    if (formData.value.tags.length < 5) {
      formData.value.tags.push(tag);
    }
  }
};

const mockAIOptimize = () => {
  if (!formData.value.description) {
    formData.value.description = "负责前端开发";
  }
  isOptimizing.value = true;
  setTimeout(() => {
    formData.value.description = `【工作职责】
1. 负责公司核心业务线的前端架构规划、设计及核心代码的编写；
2. 深度参与产品需求讨论，从前期体验交互到上线效果提供专业技术建议；
3. 建设与优化前端基础设施，包括脚手架、组件库和性能监控体系，提升研发效率。

【任职要求】
1. 本科及以上学历，计算机相关专业，具有扎实的数据结构及算法基础；
2. 熟练掌握 HTML/CSS/JavaScript(ES6+) 及 TypeScript；
3. 深入理解 Vue3 / React 设计原理逻辑，具有大型单页面应用(SPA)实际开发与架构经验；
4. 具备高度的技术敏锐度、良好的跨团队沟通表达能力和卓越的解决问题能力。`;
    isOptimizing.value = false;
  }, 1200);
};

const submitJob = () => {
  isSubmitting.value = true;
  setTimeout(() => {
    isSubmitting.value = false;
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
      router.push('/recruiter/jobs');
    }, 2000);
  }, 800);
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
}

.post-job-page {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.post-header {
  margin-bottom: 30px;
  text-align: center;
}
.post-header h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
}
.post-header p {
  color: #666;
  font-size: 15px;
}

/* 表单容器 */
.form-container {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.post-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.form-section {
  background: var(--cornsilk);
  border-radius: 8px;
  padding: 24px;
  border: 1px solid var(--beige);
}

.section-title-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}
.form-section:not(:first-child) > .section-title {
  margin-bottom: 20px;
}

/* 栅格布局 */
.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.flex-1 { flex: 1; }
.flex-2 { flex: 2; }

/* 表单元素 */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  color: #555;
  font-weight: 500;
}

.required {
  color: #e53e3e;
  margin-left: 4px;
}

input[type="text"], select, textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fff;
  font-size: 14px;
  color: #333;
  outline: none;
  transition: all 0.2s;
  font-family: inherit;
}

input[type="text"]:focus, select:focus, textarea:focus {
  border-color: var(--light-bronze);
  box-shadow: 0 0 0 3px rgba(212, 163, 115, 0.2);
}

/* 标签选项 */
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.selectable-tag {
  padding: 6px 14px;
  border-radius: 20px;
  background: #f0f0f0;
  color: #666;
  font-size: 13px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s;
}
.selectable-tag:hover {
  background: var(--beige);
  color: #333;
}
.selectable-tag.selected {
  background: var(--tea-green);
  color: #222;
  border-color: var(--tea-green);
  font-weight: bold;
}

/* AI润色按钮 */
.btn-ai-optimize {
  background: linear-gradient(135deg, var(--tea-green), var(--beige));
  border: none;
  color: #333;
  font-weight: bold;
  font-size: 13px;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-ai-optimize:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
.btn-ai-optimize:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* 底部提交区 */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 10px;
}
.btn-cancel {
  padding: 12px 24px;
  background: transparent;
  border: 1px solid #ddd;
  color: #666;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}
.btn-cancel:hover { background: #f5f5f5; }

.btn-submit {
  padding: 12px 36px;
  background: var(--light-bronze);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  box-shadow: 0 4px 12px rgba(212, 163, 115, 0.3);
}
.btn-submit:hover:not(:disabled) {
  background: #c39263;
  transform: translateY(-2px);
}

/* Toast 动画 */
.toast-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(255,255,255,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  animation: fadeIn 0.3s;
}
.toast {
  background: white;
  padding: 30px 40px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  animation: popUp 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}
.toast-content h4 {
  margin: 0 0 6px 0;
  font-size: 20px;
  color: #333;
}
.toast-content p {
  margin: 0;
  color: #666;
  font-size: 14px;
}
@keyframes popUp {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes pulse {
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
}
.dots { animation: pulse 1s infinite; display: inline-block; }
</style>