<template>
  <div class="job-detail">
    <!-- 头部信息 -->
    <div class="job-detail-header">
      <div class="job-info">
        <div class="job-title-section">
          <h3 class="job-title">前端开发工程师</h3>
          <span class="job-salary">15K-25K</span>
        </div>
        <div class="job-tags-important">
          <span class="tag-important">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="tag-icon">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            北京
          </span>
          <span class="tag-important">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="tag-icon">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            3-5年
          </span>
          <span class="tag-important">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="tag-icon">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
            本科
          </span>
        </div>
      </div>
      <div class="job-actions">
        <button class="favourite-btn" @click="toggleFavourite">
          <svg v-if="!isFavourited" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="favourite-icon">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" class="favourite-icon">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span>{{ isFavourited ? '已收藏' : '收藏' }}</span>
        </button>
        <button class="contact-btn">立刻沟通</button>
      </div>
    </div>
    
    <!-- 内容区 -->
    <div class="job-detail-content">
      <h4 class="section-title">职位描述</h4>
      <div class="job-description">
        <p>1. 负责公司产品的前端开发工作，参与产品需求分析和技术方案设计。</p>
        <p>2. 构建高性能、可维护的前端应用，优化用户体验。</p>
        <p>3. 与后端开发人员协作，实现前后端数据交互。</p>
        <p>4. 持续学习新技术，提升团队技术水平。</p>
        <p>5. 参与代码评审，确保代码质量。</p>
      </div>
      
      <h4 class="section-title">发布人信息</h4>
      <div class="publisher-info">
        <div class="publisher-avatar"></div>
        <div class="publisher-details">
          <span class="publisher-name">张经理</span>
          <span class="publisher-status">在线</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobDetail',
  data() {
    return {
      isFavourited: false
    }
  },
  methods: {
    toggleFavourite() {
      this.isFavourited = !this.isFavourited
    }
  }
}
</script>

<style scoped>
.job-detail {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.job-detail-header {
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(135deg, var(--cornsilk), rgba(254, 250, 224, 0.8));
  position: sticky;
  top: 0;
  z-index: 10;
}

.job-info {
  margin-bottom: 16px;
}

.job-title-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.job-title {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  color: #333;
}

.job-salary {
  color: var(--light-bronze);
  font-weight: bold;
  font-size: 18px;
  background-color: rgba(192, 146, 99, 0.1);
  padding: 6px 12px;
  border-radius: 20px;
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
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  color: #666;
  background-color: rgba(233, 237, 201, 0.7);
}

.tag-icon {
  width: 16px;
  height: 16px;
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
  padding: 10px 16px;
  background-color: transparent;
  border: 1px solid var(--light-bronze);
  border-radius: 20px;
  color: var(--light-bronze);
  cursor: pointer;
  transition: all 0.3s;
}

.favourite-btn:hover {
  background-color: var(--light-bronze);
  color: white;
}

.favourite-icon {
  width: 16px;
  height: 16px;
}

.contact-btn {
  padding: 10px 20px;
  background-color: var(--light-bronze);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.contact-btn:hover {
  background-color: #c09263;
  transform: scale(1.05);
}

.job-detail-content {
  padding: 24px;
  flex: 1;
  overflow-y: auto;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 16px;
  color: #333;
}

.job-description {
  margin-bottom: 24px;
  line-height: 1.6;
  color: #666;
}

.job-description p {
  margin-bottom: 10px;
}

.publisher-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: rgba(254, 250, 224, 0.8);
  border-radius: 10px;
}

.publisher-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--tea-green);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--light-bronze);
  font-size: 18px;
}

.publisher-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.publisher-name {
  font-weight: 500;
  color: #333;
}

.publisher-status {
  font-size: 12px;
  color: #4CAF50;
  background-color: rgba(76, 175, 80, 0.1);
  padding: 2px 8px;
  border-radius: 10px;
  align-self: flex-start;
}
</style>