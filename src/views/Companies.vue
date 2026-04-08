<template>
  <div class="companies">
    <!-- 顶部拓展栏 -->
    <div class="top-section">
      <!-- 搜索区域 -->
      <div class="search-section">
        <div class="container">
          <div class="search-container">
            <!-- 职位类型下拉菜单 -->
            <div class="job-type-dropdown">
              <div class="dropdown-toggle" @click="toggleJobTypeDropdown">
                {{ selectedJobType }}
                <span class="dropdown-icon">▼</span>
              </div>
              <div class="dropdown-menu" v-if="jobTypeDropdownOpen">
                <div class="dropdown-item" v-for="type in jobTypes" :key="type" @click="selectJobType(type)">
                  {{ type }}
                </div>
              </div>
            </div>
            
            <!-- 搜索框 -->
            <div class="search-box">
              <input type="text" placeholder="搜索职位、公司" v-model="searchQuery" />
            </div>
            
            <!-- 搜索按钮 -->
            <button class="search-btn" @click="search">搜索</button>
          </div>
        </div>
      </div>
      
      <!-- 筛选区域 -->
      <div class="filter-section">
        <div class="container">
          <!-- 公司地点 -->
          <div class="filter-group">
            <span class="filter-label">公司地点:</span>
            <div class="filter-options">
              <span 
                v-for="city in cities" 
                :key="city" 
                class="filter-option" 
                :class="{ active: selectedCity === city }"
                @click="selectCity(city)"
              >
                {{ city }}
              </span>
              <span 
                class="filter-option" 
                :class="{ active: selectedCity === '全部城市' }"
                @click="selectCity('全部城市')"
              >
                全部城市
              </span>
            </div>
          </div>
          
          <!-- 行业类型 -->
          <div class="filter-group">
            <span class="filter-label">行业类型:</span>
            <div class="filter-options">
              <span 
                class="filter-option" 
                :class="{ active: selectedIndustry === '不限' }"
                @click="selectIndustry('不限')"
              >
                不限
              </span>
              <span 
                v-for="industry in industries" 
                :key="industry" 
                class="filter-option" 
                :class="{ active: selectedIndustry === industry }"
                @click="selectIndustry(industry)"
              >
                {{ industry }}
              </span>
            </div>
          </div>
          
          <!-- 融资阶段 -->
          <div class="filter-group">
            <span class="filter-label">融资阶段:</span>
            <div class="filter-options">
              <span 
                class="filter-option" 
                :class="{ active: selectedStage === '不限' }"
                @click="selectStage('不限')"
              >
                不限
              </span>
              <span 
                v-for="stage in stages" 
                :key="stage" 
                class="filter-option" 
                :class="{ active: selectedStage === stage }"
                @click="selectStage(stage)"
              >
                {{ stage }}
              </span>
            </div>
          </div>
          
          <!-- 公司规模 -->
          <div class="filter-group">
            <span class="filter-label">公司规模:</span>
            <div class="filter-options">
              <span 
                class="filter-option" 
                :class="{ active: selectedSize === '不限' }"
                @click="selectSize('不限')"
              >
                不限
              </span>
              <span 
                v-for="size in sizes" 
                :key="size" 
                class="filter-option" 
                :class="{ active: selectedSize === size }"
                @click="selectSize(size)"
              >
                {{ size }}
              </span>
            </div>
            
            <!-- 清空筛选条件 -->
            <div class="clear-filter">
              <span class="clear-btn" @click="clearFilters">清空筛选条件</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 页面主体 -->
    <div class="container main-content">
      <h1>公司列表</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Companies',
  data() {
    return {
      // 职位类型
      jobTypes: ['职位类型', '全部', '前端开发', '后端开发', '产品经理', 'UI设计', '市场营销', '人力资源'],
      selectedJobType: '职位类型',
      jobTypeDropdownOpen: false,
      
      // 搜索
      searchQuery: '',
      
      // 公司地点
      cities: ['北京', '全国', '上海', '广州', '深圳', '杭州', '天津', '西安', '苏州', '武汉', '厦门', '长沙', '成都', '郑州', '重庆'],
      selectedCity: '北京',
      
      // 行业类型
      industries: [
        '电子商务', '游戏', '社交网络与媒体', '广告营销', '大数据', '医疗健康', '生活服务(O2O)', 'O2O', '旅游', '分类信息', '音乐/视频/阅读', '在线教育', '社交网络',
        '人力资源服务', '企业服务', '信息安全', '智能硬件', '移动互联网', '互联网', '计算机软件', '通信网络设备', '广告/公关/会展', '互联网金融', '物流/仓储', '进出口贸易',
        '咨询', '工程施工', '汽车研发/制造', '其他行业'
      ],
      selectedIndustry: '不限',
      
      // 融资阶段
      stages: ['未融资', '天使轮', 'A轮', 'B轮', 'C轮', 'D轮及以上', '已上市', '不需要融资'],
      selectedStage: '不限',
      
      // 公司规模
      sizes: ['0-20人', '20-99人', '100-499人', '500-999人', '1000-9999人', '10000人以上'],
      selectedSize: '不限'
    }
  },
  methods: {
    // 职位类型下拉菜单
    toggleJobTypeDropdown() {
      this.jobTypeDropdownOpen = !this.jobTypeDropdownOpen;
    },
    
    selectJobType(type) {
      this.selectedJobType = type;
      this.jobTypeDropdownOpen = false;
    },
    
    // 搜索
    search() {
      console.log('搜索:', this.searchQuery);
      // 这里可以添加搜索逻辑
    },
    
    // 公司地点选择
    selectCity(city) {
      this.selectedCity = city;
    },
    
    // 行业类型选择
    selectIndustry(industry) {
      this.selectedIndustry = industry;
    },
    
    // 融资阶段选择
    selectStage(stage) {
      this.selectedStage = stage;
    },
    
    // 公司规模选择
    selectSize(size) {
      this.selectedSize = size;
    },
    
    // 清空筛选条件
    clearFilters() {
      this.selectedJobType = '职位类型';
      this.searchQuery = '';
      this.selectedCity = '北京';
      this.selectedIndustry = '不限';
      this.selectedStage = '不限';
      this.selectedSize = '不限';
    }
  }
}
</script>

<style scoped>
.companies {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--tea-green) 0%, var(--cornsilk) 100%);
  background-attachment: fixed;
  position: relative;
  padding-top: 60px;
}

.companies::before {
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

/* 顶部拓展栏 */
.top-section {
  background-color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
  border-radius: 0 0 20px 20px;
  margin-bottom: 30px;
  overflow: hidden;
}

/* 搜索区域 */
.search-section {
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(135deg, var(--cornsilk), rgba(254, 250, 224, 0.5));
}

/* 搜索容器 */
.search-container {
  display: flex;
  align-items: center;
  gap: 0;
  max-width: 800px;
  margin: 0 auto;
  border: 2px solid var(--light-bronze);
  border-radius: 8px;
  overflow: hidden;
}

/* 职位类型下拉菜单 */
.job-type-dropdown {
  position: relative;
  background-color: white;
  border-right: 1px solid #e0e0e0;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: all 0.3s;
}

.dropdown-toggle:hover {
  background-color: rgba(233, 237, 201, 0.5);
}

.dropdown-icon {
  font-size: 12px;
  color: #666;
  transition: transform 0.3s;
}

.job-type-dropdown:hover .dropdown-icon {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  max-height: 300px;
  overflow-y: auto;
  border-radius: 0 0 8px 8px;
}

.dropdown-item {
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.dropdown-item:hover {
  background-color: var(--beige);
  color: var(--light-bronze);
}

/* 搜索框 */
.search-box {
  flex: 1;
  background-color: white;
}

.search-box input {
  width: 100%;
  padding: 12px 16px;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
}

.search-box input::placeholder {
  color: #999;
}

/* 搜索按钮 */
.search-btn {
  padding: 12px 32px;
  background-color: var(--light-bronze);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(192, 146, 99, 0.3);
}

.search-btn:hover {
  background-color: #c09263;
  transform: scale(1.02);
  box-shadow: 0 6px 16px rgba(192, 146, 99, 0.4);
}

/* 筛选区域 */
.filter-section {
  padding: 20px 0;
  background-color: white;
}

/* 筛选组 */
.filter-group {
  margin-bottom: 20px;
}

.filter-label {
  display: inline-block;
  width: 80px;
  font-size: 14px;
  color: #333;
  font-weight: 500;
  margin-right: 16px;
  vertical-align: top;
}

.filter-options {
  display: inline-block;
  vertical-align: top;
  max-width: calc(100% - 96px);
}

.filter-option {
  display: inline-block;
  padding: 6px 12px;
  margin-right: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: 20px;
  font-size: 14px;
  color: #666;
  background-color: rgba(233, 237, 201, 0.3);
  border: 1px solid rgba(233, 237, 201, 0.5);
  transition: all 0.3s;
}

.filter-option:hover {
  background-color: var(--beige);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: var(--light-bronze);
}

.filter-option.active {
  background-color: var(--light-bronze);
  color: white;
  border-color: var(--light-bronze);
  box-shadow: 0 4px 12px rgba(192, 146, 99, 0.3);
}

/* 清空筛选条件 */
.clear-filter {
  text-align: right;
  margin-top: 16px;
}

.clear-btn {
  color: var(--light-bronze);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  padding: 4px 8px;
  border-radius: 4px;
}

.clear-btn:hover {
  background-color: rgba(192, 146, 99, 0.1);
}

/* 容器 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

/* 页面主体 */
.main-content {
  padding-bottom: 60px;
}

.main-content h1 {
  color: var(--light-bronze);
  font-size: 28px;
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
  padding-bottom: 12px;
}

.main-content h1::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, var(--light-bronze), rgba(192, 146, 99, 0.5));
  border-radius: 2px;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .search-container {
    flex-direction: column;
    max-width: 100%;
  }
  
  .job-type-dropdown {
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    width: 100%;
  }
  
  .search-box {
    width: 100%;
  }
  
  .search-btn {
    width: 100%;
  }
  
  .filter-label {
    display: block;
    margin-bottom: 8px;
  }
  
  .filter-options {
    max-width: 100%;
  }
}
</style>