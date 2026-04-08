<template>
  <div class="jobs">
    <!-- 顶部拓展栏（一层） -->
    <div class="top-bar">
      <div class="container">
        <!-- 期望选择区 -->
        <div class="expectation-section">
          <div class="expectation-tabs">
            <div class="expectation-tab active">推荐</div>
            <div class="divider">|</div>
            <div class="expectation-tab">前端开发</div>
            <div class="expectation-tab">后端开发</div>
            <div class="expectation-tab">产品经理</div>
            <button class="add-expectation-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="plus-icon">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              添加期望
            </button>
          </div>
        </div>
        
        <!-- 搜索框 -->
        <div class="search-section">
          <SearchBox />
        </div>
      </div>
    </div>
    
    <!-- 顶部拓展栏（二层） -->
    <div class="filter-bar">
      <div class="container">
        <div class="filter-tabs">
          <div class="filter-tab">
            <span>求职类型</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div class="filter-tab">
            <span>薪资待遇</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div class="filter-tab">
            <span>工作经验</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div class="filter-tab">
            <span>学历要求</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div class="filter-tab">
            <span>公司行业</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div class="filter-tab">
            <span>公司规模</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 页面主体 -->
    <div class="container main-content">
      <div class="content-wrapper">
        <!-- 职位卡片区 -->
        <div class="job-list">
          <div class="job-card" v-for="job in jobs" :key="job.id" @click="selectJob(job)">
            <!-- 顶部标题区 -->
            <div class="job-header">
              <div class="job-title-container">
                <h3 class="job-title">{{ job.title }}</h3>
              </div>
              <span class="job-salary">{{ job.salary }}</span>
            </div>
            
            <!-- 中部tag区 -->
            <div class="job-tags">
              <span class="tag" v-for="tag in job.tags" :key="tag">{{ tag }}</span>
            </div>
            
            <!-- 底部企业名片 -->
            <div class="company-card">
              <div class="company-logo"></div>
              <span class="company-name">{{ job.company }}</span>
              <span class="job-location">{{ job.location }}</span>
            </div>
          </div>
        </div>
        
        <!-- 职位详情区 -->
        <div class="job-detail-section">
          <JobDetail />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JobDetail from '../components/JobDetail.vue'
import SearchBox from '../components/SearchBox.vue'

export default {
  name: 'Jobs',
  components: {
    JobDetail,
    SearchBox
  },
  data() {
    return {
      jobs: [
        {
          id: 1,
          title: '前端开发工程师',
          company: '科技有限公司',
          salary: '15K-25K',
          location: '北京',
          tags: ['3-5年', '本科', '全职']
        },
        {
          id: 2,
          title: '后端开发工程师',
          company: '互联网公司',
          salary: '18K-28K',
          location: '上海',
          tags: ['1-3年', '本科', '全职']
        },
        {
          id: 3,
          title: '产品经理',
          company: '创业公司',
          salary: '12K-22K',
          location: '广州',
          tags: ['3-5年', '本科', '全职']
        },
        {
          id: 4,
          title: 'UI设计师',
          company: '设计公司',
          salary: '10K-20K',
          location: '深圳',
          tags: ['1-3年', '大专', '全职']
        },
        {
          id: 5,
          title: '数据分析师',
          company: '金融科技公司',
          salary: '15K-25K',
          location: '杭州',
          tags: ['3-5年', '本科', '全职']
        },
        {
          id: 6,
          title: '运营专员',
          company: '电商公司',
          salary: '8K-15K',
          location: '成都',
          tags: ['1-3年', '大专', '全职']
        }
      ],
      selectedJob: null
    }
  },
  methods: {
    selectJob(job) {
      this.selectedJob = job
    }
  }
}
</script>

<style scoped>
.jobs {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--tea-green) 0%, var(--cornsilk) 100%);
  background-attachment: fixed;
  position: relative;
  padding-top: 60px;
}

.jobs::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="none" stroke="%23f0f0f0" stroke-width="0.5" opacity="0.3"/></svg>');
  background-size: 50px 50px;
  z-index: 0;
  pointer-events: none;
}

/* 容器 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

/* 顶部拓展栏（一层） */
.top-bar {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px 0;
  position: relative;
  z-index: 10;
}

.expectation-section {
  margin-bottom: 16px;
}

.expectation-tabs {
  display: flex;
  align-items: center;
  gap: 16px;
}

.expectation-tab {
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  font-size: 14px;
  color: #666;
}

.expectation-tab:hover {
  color: var(--light-bronze);
}

.expectation-tab.active {
  color: var(--light-bronze);
  font-weight: 500;
}

.expectation-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 16px;
  right: 16px;
  height: 2px;
  background-color: var(--light-bronze);
}

.divider {
  color: #ddd;
}

.add-expectation-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background-color: transparent;
  border: 1px solid var(--light-bronze);
  border-radius: 20px;
  color: var(--light-bronze);
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.add-expectation-btn:hover {
  background-color: var(--light-bronze);
  color: white;
}

.plus-icon {
  width: 14px;
  height: 14px;
}

/* 搜索框 */
.search-section {
  margin-top: 16px;
}

/* 顶部拓展栏（二层） */
.filter-bar {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 12px 0;
  position: relative;
  z-index: 5;
  margin-bottom: 24px;
}

.filter-tabs {
  display: flex;
  align-items: center;
  gap: 24px;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
}

.filter-tab:hover {
  color: var(--light-bronze);
  background-color: rgba(233, 237, 201, 0.5);
}

.filter-tab:hover .arrow-icon {
  transform: rotate(180deg);
}

.arrow-icon {
  width: 14px;
  height: 14px;
  transition: all 0.3s;
}

/* 页面主体 */
.main-content {
  padding-bottom: 60px;
}

.content-wrapper {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

/* 职位卡片区 */
.job-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.job-card {
  padding: 20px;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  transition: all 0.3s;
  background-color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.job-card:hover {
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  border-color: var(--light-bronze);
}

.job-card:hover .job-title {
  color: var(--light-bronze);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.job-title-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.job-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  transition: color 0.3s;
  line-height: 1.4;
}

.job-salary {
  color: var(--light-bronze);
  font-weight: bold;
  font-size: 16px;
  background-color: rgba(192, 146, 99, 0.1);
  padding: 6px 12px;
  border-radius: 20px;
}

.job-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  padding: 4px 12px;
  background-color: rgba(233, 237, 201, 0.7);
  border-radius: 20px;
  font-size: 13px;
  color: #666;
  transition: all 0.3s;
}

.company-card {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 12px 16px;
  background-color: rgba(254, 250, 224, 0.8);
  border-radius: 10px;
  transition: all 0.3s;
  height: 50px;
  border: 1px solid rgba(233, 237, 201, 0.5);
}

.company-card:hover {
  background-color: rgba(254, 250, 224, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.company-card .company-name {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  font-weight: 500;
  text-align: left;
  line-height: 23px;
  padding-top: 0;
  padding-bottom: 0;
}

.company-card:hover .company-name {
  color: var(--light-bronze);
}

.company-logo {
  width: 32px;
  height: 32px;
  background-color: var(--beige);
  border-radius: 6px;
  line-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--light-bronze);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.company-name {
  flex: 1;
  font-size: 14px;
  margin: 0;
  text-align: left;
  transition: color 0.3s;
}

.job-location {
  font-size: 13px;
  color: #666;
  margin: 0;
  background-color: rgba(102, 102, 102, 0.1);
  padding: 2px 8px;
  border-radius: 10px;
}

/* 职位详情区 */
.job-detail-section {
  width: 380px;
  position: sticky;
  top: 84px;
  height: calc(100vh - 120px);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .content-wrapper {
    flex-direction: column;
  }
  
  .job-detail-section {
    width: 100%;
    position: static;
    height: auto;
  }
  
  .filter-tabs {
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .expectation-tabs {
    flex-wrap: wrap;
  }
}
</style>