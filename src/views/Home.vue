<template>
  <div class="home">
    <!-- 英雄区域 -->
    <section class="hero">
      <div class="hero-content">
        <h1>找到理想的工作，开启职业生涯</h1>
        <p>Recuraim为您提供海量优质职位，助您实现职业目标</p>
        <SearchBox />
      </div>
    </section>

    <!-- 职位推荐 -->
    <section class="job-recommendations">
      <div class="container">
        <h2>热门职位推荐</h2>
        <div class="job-list">
          <div class="job-card" v-for="job in jobs" :key="job.id">
            <!-- 顶部标题区 -->
            <div class="job-header">
              <div class="job-title-container">
                <h3 class="job-title">{{ job.title }}</h3>
                <a href="#" class="talk-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </a>
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
        
        <!-- 查看更多按钮 -->
        <div class="more-jobs">
          <button class="more-btn">查看更多职位</button>
        </div>
      </div>
    </section>

    <!-- 公司推荐 -->
    <section class="company-recommendations">
      <div class="container">
        <h2>知名企业</h2>
        <div class="company-list">
          <div class="company-card-full" v-for="company in companies" :key="company.id">
            <!-- 顶部标题区 -->
            <div class="company-header">
              <div class="company-logo"></div>
              <div class="company-info">
                <h3 class="company-name">{{ company.name }}</h3>
                <div class="company-tags">
                  <span class="tag" v-for="tag in company.tags" :key="tag">{{ tag }}</span>
                </div>
              </div>
            </div>
            
            <!-- 招聘列表元素 -->
            <div class="company-jobs">
              <div class="job-item" v-for="(job, index) in company.jobList" :key="index">
                <div class="job-item-header">
                  <div class="job-item-title-container">
                    <h4 class="job-item-title">{{ job.title }}</h4>
                    <a href="#" class="talk-link">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                      </svg>
                    </a>
                  </div>
                  <span class="job-item-salary">{{ job.salary }}</span>
                </div>
                <div class="job-item-tags">
                  <span class="tag" v-for="tag in job.tags" :key="tag">{{ tag }}</span>
                </div>
              </div>
              <!-- 填充空职位 -->
              <div class="job-item empty" v-for="i in (3 - company.jobList.length)" :key="'empty-' + i"></div>
            </div>
            
            <!-- 查看更多按钮 -->
            <div class="company-more">
              <button class="more-btn-outline">查看更多</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SearchBox from '../components/SearchBox.vue'

export default {
  name: 'Home',
  components: {
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
        }
      ],
      companies: [
        {
          id: 1,
          name: '阿里巴巴',
          tags: ['上市公司', '10000人以上', '电商'],
          jobList: [
            {
              title: '前端开发工程师',
              salary: '20K-35K',
              tags: ['3-5年', '本科']
            },
            {
              title: '后端开发工程师',
              salary: '25K-40K',
              tags: ['3-5年', '本科']
            },
            {
              title: '产品经理',
              salary: '18K-30K',
              tags: ['3-5年', '本科']
            }
          ]
        },
        {
          id: 2,
          name: '腾讯',
          tags: ['上市公司', '10000人以上', '社交'],
          jobList: [
            {
              title: '前端开发工程师',
              salary: '22K-38K',
              tags: ['3-5年', '本科']
            },
            {
              title: '后端开发工程师',
              salary: '26K-42K',
              tags: ['3-5年', '本科']
            }
          ]
        },
        {
          id: 3,
          name: '百度',
          tags: ['上市公司', '10000人以上', '搜索'],
          jobList: [
            {
              title: '前端开发工程师',
              salary: '19K-34K',
              tags: ['3-5年', '本科']
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
/* 全局样式 */
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--tea-green) 0%, var(--cornsilk) 100%);
  background-attachment: fixed;
  position: relative;
  padding-top: 60px;
}

/* 背景装饰 */
.home::before {
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

/* 英雄区域 */
.hero {
  background: linear-gradient(135deg, var(--tea-green) 0%, rgba(233, 237, 201, 0.8) 100%);
  padding: 80px 20px;
  text-align: center;
  position: relative;
  z-index: 1;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 30px 30px;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero h1 {
  font-size: 42px;
  margin-bottom: 20px;
  color: #333;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.5px;
}

.hero p {
  font-size: 20px;
  margin-bottom: 40px;
  color: #666;
  line-height: 1.6;
}



/* 容器 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  position: relative;
  z-index: 1;
}

/* 分块样式 */
.job-recommendations,
.company-recommendations {
  background-color: rgba(255, 255, 255, 0.95);
  margin: 40px 0;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.job-recommendations:hover,
.company-recommendations:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

/* 标题样式 */
h2 {
  font-size: 28px;
  margin-bottom: 35px;
  color: var(--light-bronze);
  font-weight: 700;
  position: relative;
  display: inline-block;
  padding-bottom: 12px;
}

h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, var(--light-bronze), rgba(192, 146, 99, 0.5));
  border-radius: 2px;
}

/* 职位推荐部分 */
.job-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.job-card {
  padding: 24px;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  transition: all 0.3s;
  background-color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.job-card:hover {
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-6px);
}

.job-card:hover .job-title {
  color: var(--light-bronze);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.job-title-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.job-title {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  transition: color 0.3s;
  line-height: 1.4;
}

.talk-link {
  color: #999;
  transition: all 0.3s;
  padding: 6px;
  border-radius: 50%;
}

.talk-link:hover {
  color: var(--light-bronze);
  transform: scale(1.1);
}

.talk-link:hover + .job-title {
  color: var(--light-bronze);
}

.job-salary {
  color: var(--light-bronze);
  font-weight: bold;
  font-size: 18px;
  background-color: rgba(192, 146, 99, 0.1);
  padding: 6px 12px;
  border-radius: 20px;
}

.job-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
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

.more-jobs {
  text-align: center;
  margin-top: 40px;
}

.more-btn {
  padding: 14px 36px;
  background-color: var(--light-bronze);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(192, 146, 99, 0.3);
}

.more-btn:hover {
  background-color: #c09263;
  transform: scale(1.08);
  box-shadow: 0 6px 20px rgba(192, 146, 99, 0.4);
}

/* 公司推荐部分 */
.company-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  gap: 24px;
}

.company-card-full {
  padding: 20px;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  background-color: white;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.company-card-full:hover {
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.company-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
  padding: 20px;
  background: linear-gradient(135deg, var(--cornsilk), rgba(254, 250, 224, 0.8));
  border-radius: 10px;
  transition: all 0.3s;
  border: 1px solid rgba(233, 237, 201, 0.5);
}

.company-header:hover {
  background: linear-gradient(135deg, var(--cornsilk), var(--tea-green));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.company-header > .company-logo {
  width: 72px;
  height: 72px;
  font-size: 24px;
}

.company-header:hover .company-name {
  color: var(--light-bronze);
}

.company-info {
  flex: 1;
  flex-direction: column;
  height: 72px;
}

.company-info > .company-name {
  font-size: 22px;
  line-height: 1.4;
  font-weight: bold;
  margin: 0;
  transition: color 0.3s;
  flex: 2;
}

.company-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1;
}

.company-jobs {
  flex: 1;
  margin-bottom: 24px;
}

.job-item {
  padding: 18px 0;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s;
}

.job-item:hover {
  padding-left: 10px;
  border-left: 3px solid var(--light-bronze);
}

.job-item:hover .job-item-title {
  color: var(--light-bronze);
}

.job-item:last-child {
  border-bottom: 1px solid #f0f0f0;
}

.job-item.empty {
  height: 96px;
  border-bottom: 1px solid #f0f0f0;
}

.job-item.empty:last-child {
  border-bottom: 1px solid #f0f0f0;
}

.job-item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.job-item-title-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.job-item-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  transition: color 0.3s;
  line-height: 1.4;
}

.job-item-salary {
  color: var(--light-bronze);
  font-weight: bold;
  font-size: 16px;
  background-color: rgba(192, 146, 99, 0.1);
  padding: 4px 10px;
  border-radius: 15px;
}

.job-item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.job-item-tags .tag {
  font-size: 12px;
  padding: 3px 10px;
}

.company-more {
  text-align: center;
  margin-top: auto;
  padding-top: 24px;
}

.more-btn-outline {
  padding: 10px 24px;
  background-color: transparent;
  color: var(--light-bronze);
  border: 2px solid var(--light-bronze);
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.more-btn-outline:hover {
  background-color: var(--light-bronze);
  color: white;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(192, 146, 99, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 32px;
  }
  
  .hero p {
    font-size: 16px;
  }
  
  .container {
    padding: 40px 20px;
  }
  
  .job-recommendations,
  .company-recommendations {
    padding: 24px;
  }
  
  .company-list {
    grid-template-columns: 1fr;
  }
  
  .job-list {
    grid-template-columns: 1fr;
  }
}
</style>