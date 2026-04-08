<template>
  <div class="job-detail">
    <!-- 头部信息 -->
    <div class="job-detail-header">
      <!-- 第一行：职位名称和薪资 -->
      <div class="job-title-section">
        <h3 class="job-title">前端开发工程师</h3>
        <span class="job-salary">15K-25K</span>
      </div>
      
      <!-- 第二行：tag和action -->
      <div class="job-secondary-section">
        <div class="job-tags-important">
          <span class="tag-important">
            <img src="../assets/icons/location2.png" alt="location" class="tag-icon">
            北京
          </span>
          <span class="tag-important">
            <img src="../assets/icons/exp.png" alt="experience" class="tag-icon">
            3-5年
          </span>
          <span class="tag-important">
            <img src="../assets/icons/knowledge.png" alt="education" class="tag-icon">
            本科
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
      <h4 class="section-title">职位描述</h4>
      <div class="job-description">
        <p>1. 负责公司产品的前端开发工作，参与产品需求分析和技术方案设计。</p>
        <p>2. 构建高性能、可维护的前端应用，优化用户体验。</p>
        <p>3. 与后端开发人员协作，实现前后端数据交互。</p>
        <p>4. 持续学习新技术，提升团队技术水平。</p>
        <p>5. 参与代码评审，确保代码质量。</p>
        <p>6. 负责前端性能优化，提高页面加载速度和响应速度。</p>
        <p>7. 编写前端技术文档，规范前端开发流程。</p>
        <p>8. 与设计师协作，实现UI/UX设计方案。</p>
        <p>9. 解决前端开发过程中的技术难题。</p>
        <p>10. 指导初级前端开发人员，提升团队整体技术水平。</p>
        <p>11. 参与前端技术选型和架构设计。</p>
        <p>12. 关注前端技术发展趋势，引入新技术提升产品竞争力。</p>
        <p>13. 负责前端代码的单元测试和集成测试。</p>
        <p>14. 优化前端构建流程，提高开发效率。</p>
        <p>15. 与产品经理沟通，理解产品需求并转化为技术实现。</p>
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
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
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
  align-items: flex-start;
  margin-bottom: 16px;
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
  padding: 8px 16px;
  border-radius: 25px;
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
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 14px;
  color: #666;
  background-color: rgba(233, 237, 201, 0.7);
  transition: all 0.3s;
  border: 1px solid rgba(233, 237, 201, 0.5);
}

.tag-important:hover {
  background-color: rgba(233, 237, 201, 1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.tag-icon {
  width: 16px;
  height: 16px;
  filter: brightness(0.6);
  transition: all 0.3s;
}

.tag-important:hover .tag-icon {
  filter: brightness(1);
  transform: scale(1.1);
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
  padding: 12px 20px;
  background-color: transparent;
  border: 2px solid var(--light-bronze);
  border-radius: 25px;
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
  padding: 12px 24px;
  background-color: var(--light-bronze);
  color: white;
  border: none;
  border-radius: 25px;
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
</style>