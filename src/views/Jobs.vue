<template>
  <div class="jobs">
    <!-- 顶部拓展栏（一层） -->
    <div class="top-bar">
      <div class="container">
        <!-- 期望选择区 -->
        <div class="expectation-section">
          <div class="expectation-tabs">
            <div class="expectation-tab" :class="{ active: selectedExpectation === '推荐' }" @click="selectExpectation('推荐')">推荐</div>
            <div class="divider">|</div>
            <div class="expectation-tab" :class="{ active: selectedExpectation === '前端开发' }" @click="selectExpectation('前端开发')">前端开发</div>
            <div class="expectation-tab" :class="{ active: selectedExpectation === '后端开发' }" @click="selectExpectation('后端开发')">后端开发</div>
            <div class="expectation-tab" :class="{ active: selectedExpectation === '产品经理' }" @click="selectExpectation('产品经理')">产品经理</div>
            <button class="add-expectation-btn">
              <img src="../assets/icons/plus2.png" alt="plus" class="plus-icon">
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
          <!-- 求职类型 -->
          <div class="filter-tab" @click="toggleFilter('jobType')" ref="jobTypeTab">
            <span :class="{ 'highlighted': filters.jobType.value !== '任意' }">
              {{ filters.jobType.title }}
              <span v-if="filters.jobType.value !== '任意'">: {{ filters.jobType.value }}</span>
            </span>
            <img src="../assets/icons/arrow_down.png" alt="arrow" class="arrow-icon" :class="{ 'rotated': filters.jobType.isOpen }">
            <!-- 下拉列表 -->
            <div class="filter-dropdown" v-if="filters.jobType.isOpen">
              <div class="filter-option" v-for="option in filters.jobType.options" :key="option" @click="selectFilterOption('jobType', option)">
                {{ option }}
              </div>
            </div>
          </div>
          
          <!-- 薪资待遇 -->
          <div class="filter-tab" @click="toggleFilter('salary')">
            <span :class="{ 'highlighted': filters.salary.value !== '任意' }">
              {{ filters.salary.title }}
              <span v-if="filters.salary.value !== '任意'">: {{ filters.salary.value }}</span>
            </span>
            <img src="../assets/icons/arrow_down.png" alt="arrow" class="arrow-icon" :class="{ 'rotated': filters.salary.isOpen }">
            <!-- 下拉列表 -->
            <div class="filter-dropdown" v-if="filters.salary.isOpen">
              <div class="filter-option" v-for="option in filters.salary.options" :key="option" @click="selectFilterOption('salary', option)">
                {{ option }}
              </div>
            </div>
          </div>
          
          <!-- 工作经验 -->
          <div class="filter-tab" @click="toggleFilter('experience')">
            <span :class="{ 'highlighted': filters.experience.value !== '任意' }">
              {{ filters.experience.title }}
              <span v-if="filters.experience.value !== '任意'">: {{ filters.experience.value }}</span>
            </span>
            <img src="../assets/icons/arrow_down.png" alt="arrow" class="arrow-icon" :class="{ 'rotated': filters.experience.isOpen }">
            <!-- 下拉列表 -->
            <div class="filter-dropdown" v-if="filters.experience.isOpen">
              <div class="filter-option" v-for="option in filters.experience.options" :key="option" @click="selectFilterOption('experience', option)">
                {{ option }}
              </div>
            </div>
          </div>
          
          <!-- 学历要求 -->
          <div class="filter-tab" @click="toggleFilter('education')">
            <span :class="{ 'highlighted': filters.education.value !== '任意' }">
              {{ filters.education.title }}
              <span v-if="filters.education.value !== '任意'">: {{ filters.education.value }}</span>
            </span>
            <img src="../assets/icons/arrow_down.png" alt="arrow" class="arrow-icon" :class="{ 'rotated': filters.education.isOpen }">
            <!-- 下拉列表 -->
            <div class="filter-dropdown" v-if="filters.education.isOpen">
              <div class="filter-option" v-for="option in filters.education.options" :key="option" @click="selectFilterOption('education', option)">
                {{ option }}
              </div>
            </div>
          </div>
          
          <!-- 公司行业 -->
          <div class="filter-tab" @click="toggleFilter('industry')">
            <span :class="{ 'highlighted': filters.industry.value !== '任意' }">
              {{ filters.industry.title }}
              <span v-if="filters.industry.value !== '任意'">: {{ filters.industry.value }}</span>
            </span>
            <img src="../assets/icons/arrow_down.png" alt="arrow" class="arrow-icon" :class="{ 'rotated': filters.industry.isOpen }">
            <!-- 下拉列表 -->
            <div class="filter-dropdown" v-if="filters.industry.isOpen">
              <div class="filter-option">暂不实现</div>
            </div>
          </div>
          
          <!-- 公司规模 -->
          <div class="filter-tab" @click="toggleFilter('companySize')">
            <span :class="{ 'highlighted': filters.companySize.value !== '任意' }">
              {{ filters.companySize.title }}
              <span v-if="filters.companySize.value !== '任意'">: {{ filters.companySize.value }}</span>
            </span>
            <img src="../assets/icons/arrow_down.png" alt="arrow" class="arrow-icon" :class="{ 'rotated': filters.companySize.isOpen }">
            <!-- 下拉列表 -->
            <div class="filter-dropdown" v-if="filters.companySize.isOpen">
              <div class="filter-option" v-for="option in filters.companySize.options" :key="option" @click="selectFilterOption('companySize', option)">
                {{ option }}
              </div>
            </div>
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
      selectedJob: null,
      selectedExpectation: '推荐',
      // 筛选器状态
      filters: {
        jobType: {
          title: '求职类型',
          value: '任意',
          options: ['任意', '全职', '兼职', '实习'],
          isOpen: false
        },
        salary: {
          title: '薪资待遇',
          value: '任意',
          options: ['任意', '5K以下', '5K-10K', '10K-15K', '15K-20K', '20K-30K', '30K以上'],
          isOpen: false
        },
        experience: {
          title: '工作经验',
          value: '任意',
          options: ['任意', '在校', '应届生', '1年内', '1~3年', '3~5年', '5年+'],
          isOpen: false
        },
        education: {
          title: '学历要求',
          value: '任意',
          options: ['任意', '高中', '大专', '本科', '硕士', '博士'],
          isOpen: false
        },
        industry: {
          title: '公司行业',
          value: '任意',
          options: [],
          isOpen: false
        },
        companySize: {
          title: '公司规模',
          value: '任意',
          options: ['任意', '少于50人', '50-100人', '100-500人', '500-1000人', '1000人以上'],
          isOpen: false
        }
      }
    }
  },
  methods: {
    selectJob(job) {
      this.selectedJob = job
    },
    selectExpectation(expectation) {
      this.selectedExpectation = expectation
    },
    // 切换筛选器状态
    toggleFilter(filterKey) {
      // 关闭所有其他筛选器
      Object.keys(this.filters).forEach(key => {
        if (key !== filterKey) {
          this.filters[key].isOpen = false
        }
      })
      // 切换当前筛选器
      this.filters[filterKey].isOpen = !this.filters[filterKey].isOpen
    },
    // 选择筛选器选项
    selectFilterOption(filterKey, option) {
      this.filters[filterKey].value = option
      this.filters[filterKey].isOpen = false
    },
    // 关闭所有筛选器
    closeAllFilters() {
      Object.keys(this.filters).forEach(key => {
        this.filters[key].isOpen = false
      })
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
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

/* 页面主体 */
.main-content {
  padding-bottom: 60px;
  max-width: 80%;
}

/* 内容包装器 */
.content-wrapper {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  width: 100%;
}

/* 顶部拓展栏（一层） */
.top-bar {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px 0;
  position: relative;
  z-index: 10;
}

.top-bar .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.expectation-section {
  flex: 1;
}

.search-section {
  flex: 1;
  margin: 0;
}

.expectation-tabs {
  display: flex;
  align-items: center;
  gap: 5px;
}

.expectation-tab {
  padding: 5px 5px;
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
  left: 5px;
  right: 5px;
  height: 2px;
  background-color: var(--light-bronze);
}

.divider {
  color: #666;
}

.add-expectation-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 5px;
  background-color: transparent;
  border: 1px solid var(--light-bronze);
  border-radius: 10px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  margin-left: 10px;
}

.add-expectation-btn:hover {
  background-color: var(--light-bronze);
  color: white;
}

.plus-icon {
  width: 14px;
  height: 14px;
  filter: brightness(0.7);
  transition: all 0.3s;
  margin-top: 1px;
}

.add-expectation-btn:hover .plus-icon {
  filter: brightness(0) invert(1);
  transform: scale(1.1);
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
  gap: 6px;
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
  position: relative;
}

/* 当值为任意时，标题颜色稍暗 */
.filter-tab span {
  color: #666;
}

/* 当值不为任意时，标题高亮 */
.filter-tab span.highlighted {
  color: var(--light-bronze);
}

/* 当值不为任意时，值也高亮 */
.filter-tab span.highlighted span {
  color: var(--light-bronze);
}

.filter-tab:hover {
  background-color: rgba(233, 237, 201, 0.5);
}

.filter-tab:hover .arrow-icon {
  filter: brightness(1);
}

.arrow-icon {
  width: 14px;
  height: 14px;
  filter: brightness(0.6);
  transition: all 0.3s;
}

.arrow-icon.rotated {
  transform: rotate(180deg);
}

/* 筛选器下拉列表 */
.filter-tab {
  position: relative;
}

.filter-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 5px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 100;
  min-width: 120px;
  max-width: 200px;
  overflow: hidden;
}

.filter-option {
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.filter-option:hover {
  background-color: var(--beige);
  color: var(--light-bronze);
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
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 300px;
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
  flex: 1;
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