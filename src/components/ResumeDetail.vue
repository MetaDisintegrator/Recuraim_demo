<template>
  <div class="resume-detail">
    <!-- 头部区域，相对固定 -->
    <div class="detail-header">
      <div class="header-info">
        <div class="info-top">
          <span class="candidate-name">{{ candidate.name }}</span>
          <span class="expected-salary">期望: {{ candidate.expectedSalary }}</span>
        </div>
        <div class="info-bottom">
          <!-- Location -->
          <div class="info-tag">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>{{ candidate.location }}</span>
          </div>
          <!-- Experience -->
          <div class="info-tag">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            <span>{{ candidate.experience }}</span>
          </div>
          <!-- Education -->
          <div class="info-tag">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
            <span>{{ candidate.education }}</span>
          </div>
        </div>
      </div>
      <div class="header-actions">
        <!-- 收藏按钮 -->
        <button class="fav-btn" @click="toggleFav" @mouseenter="hoverFav = true" @mouseleave="hoverFav = false">
          <svg v-if="isFavourited || hoverFav" viewBox="0 0 24 24" width="20" height="20" fill="var(--light-bronze)" stroke="var(--light-bronze)" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <span v-if="isFavourited" class="fav-text">已收藏</span>
        </button>
        <!-- 沟通按钮 -->
        <button class="chat-btn">立刻沟通</button>
      </div>
    </div>

    <!-- 内容滚动区 -->
    <div class="detail-content">
      <div class="section" v-if="candidate.techTags && candidate.techTags.length > 0">
        <h3 class="section-title">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
          核心技能 (AI 智能提取)
        </h3>
        <div class="tech-tags">
          <span class="tech-tag" v-for="tag in candidate.techTags" :key="tag">{{ tag }}</span>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">个人优势</h3>
        <p class="section-text">{{ candidate.advantage }}</p>
      </div>

      <div class="section">
        <h3 class="section-title">工作经历</h3>
        <div class="exp-item" v-for="(exp, index) in candidate.workExps" :key="index">
          <div class="exp-header">
            <span class="exp-company">{{ exp.company }}</span>
            <span class="exp-time">{{ exp.time }}</span>
          </div>
          <div class="exp-role">{{ exp.role }}</div>
          <p class="exp-desc">{{ exp.desc }}</p>
        </div>
      </div>

      <div class="section publisher-section">
        <h3 class="section-title">求职者信息</h3>
        <div class="publisher-info">
          <div class="publisher-avatar">
            <img v-if="candidate.avatar" :src="candidate.avatar" alt="avatar"/>
            <div v-else class="avatar-placeholder">{{ candidate.name.charAt(0) }}</div>
          </div>
          <div class="publisher-detail">
            <div class="publisher-name">{{ candidate.name }}</div>
            <span class="status-tag">当前活跃</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  candidate: {
    type: Object,
    required: true
  }
});

const isFavourited = ref(false);
const hoverFav = ref(false);

// 切换候选人时充置收藏状态（如果是mock数据可以这样做，或者将状态保存在父组件）
watch(() => props.candidate, () => {
  isFavourited.ref = false;
});

const toggleFav = () => {
  isFavourited.value = !isFavourited.value;
};
</script>

<style scoped>
.resume-detail {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  overflow: hidden;
}

.detail-header {
  padding: 24px;
  border-bottom: 2px solid var(--beige, #e9edc9);
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
}
.header-info {
  flex: 1;
}
.info-top {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}
.candidate-name {
  font-size: 22px;
  font-weight: bold;
  color: #333;
}
.expected-salary {
  font-size: 18px;
  color: var(--light-bronze, #d4a373);
  font-weight: 500;
}
.info-bottom {
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
  transition: all 0.2s;
  color: #666;
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
  cursor: pointer;
  transition: background 0.3s;
}
.chat-btn:hover {
  background-color: var(--beige, #e9edc9);
}

.detail-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}
.section {
  margin-bottom: 32px;
}
.section-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 16px;
  border-left: 4px solid var(--tea-green, #ccd5ae);
  padding-left: 10px;
  display: flex;
  align-items: center;
}
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
}
.tech-tag {
  background: var(--cornsilk, #fefae0);
  border: 1px solid var(--beige, #e9edc9);
  color: var(--light-bronze, #d4a373);
  font-size: 13px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 20px;
  transition: all 0.2s ease;
}
.tech-tag:hover {
  background: var(--beige, #e9edc9);
  color: #333;
}
.section-text {
  font-size: 15px;
  color: #555;
  line-height: 1.6;
}
.exp-item {
  margin-bottom: 20px;
}
.exp-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}
.exp-company {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
.exp-time {
  font-size: 14px;
  color: #999;
}
.exp-role {
  font-size: 15px;
  color: #666;
  margin-bottom: 8px;
}
.exp-desc {
  font-size: 14px;
  color: #777;
  line-height: 1.6;
}

.publisher-info {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--cornsilk, #fefae0);
  padding: 16px;
  border-radius: 8px;
}
.publisher-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--tea-green, #ccd5ae);
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-placeholder {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
}
.publisher-detail {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.publisher-name {
  font-size: 16px;
  font-weight: bold;
}
.status-tag {
  background: var(--papaya-whip, #faedcd);
  color: var(--light-bronze, #d4a373);
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
  display: inline-block;
  width: max-content;
}
</style>