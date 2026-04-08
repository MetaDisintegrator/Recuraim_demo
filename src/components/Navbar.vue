<template>
  <nav class="navbar">
    <!-- 标题区 -->
    <div class="navbar-header">
      <div class="logo" @click="$router.push('/')">Recuraim</div>
      <div class="location" @click="showLocationModal = true">
        <span>{{ currentLocation }}</span>
        <span class="dropdown-icon">▼</span>
      </div>
    </div>

    <!-- 导航栏 -->
    <div class="navbar-nav">
      <router-link to="/" class="nav-item" active-class="active">首页</router-link>
      <router-link to="/jobs" class="nav-item" active-class="active">职位</router-link>
      <router-link to="/companies" class="nav-item" active-class="active">公司</router-link>
      <router-link to="/discussions" class="nav-item" active-class="active">讨论</router-link>
      <div class="nav-right">
        <router-link to="/messages" class="nav-item" active-class="active">消息</router-link>
        <router-link to="/resume" class="nav-item" active-class="active">简历</router-link>
      </div>
    </div>

    <!-- 个人信息 -->
    <div class="user-info" @mouseenter="showUserMenu = true" @mouseleave="showUserMenu = false">
      <span class="user-name">用户</span>
      <div class="user-avatar"></div>
      <!-- 个人菜单 -->
      <div class="user-menu" v-if="showUserMenu">
        <a href="#" class="menu-item">完善信息</a>
        <a href="#" class="menu-item">切换为招聘者</a>
        <a href="/login" class="menu-item">退出登录</a>
      </div>
    </div>

    <!-- 地区选择模态框 -->
    <div class="modal" v-if="showLocationModal" @click="showLocationModal = false">
      <div class="modal-content" @click.stop>
        <h3>选择地区</h3>
        <div class="search-box">
          <input type="text" placeholder="搜索地区" v-model="locationSearch" />
        </div>
        <div class="location-list">
          <div class="location-item" v-for="location in locations" :key="location" @click="selectLocation(location)">
            {{ location }}
          </div>
        </div>
        <button class="close-btn" @click="showLocationModal = false">关闭</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      currentLocation: '北京',
      showLocationModal: false,
      showUserMenu: false,
      locationSearch: '',
      locations: ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安', '南京', '天津']
    }
  },
  methods: {
    selectLocation(location) {
      this.currentLocation = location;
      this.showLocationModal = false;
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: var(--light-bronze);
  cursor: pointer;
}

.location {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.3s;
}

.location:hover {
  background-color: var(--beige);
}

.dropdown-icon {
  font-size: 12px;
}

.navbar-nav {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  gap: 40px;
}

.nav-right {
  display: flex;
  gap: 40px;
  margin-left: auto;
}

.nav-item {
  text-decoration: none;
  color: #333;
  font-size: 16px;
  padding: 10px 0;
  position: relative;
  transition: all 0.3s;
}

.nav-item:hover {
  color: var(--light-bronze);
}

.nav-item.active {
  color: var(--light-bronze);
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--light-bronze);
  transition: width 0.3s;
}

.nav-item:hover::after,
.nav-item.active::after {
  width: 100%;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
}

.user-info:hover {
  background-color: var(--beige);
}

.user-name {
  font-size: 14px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--tea-green);
}

.user-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 5px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  overflow: hidden;
  z-index: 100;
}

.menu-item {
  display: block;
  padding: 10px 20px;
  text-decoration: none;
  color: #333;
  transition: all 0.3s;
}

.menu-item:hover {
  background-color: var(--beige);
  color: var(--light-bronze);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  max-width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-content h3 {
  margin-bottom: 15px;
  color: var(--light-bronze);
}

.search-box {
  margin-bottom: 15px;
}

.search-box input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.location-list {
  margin-bottom: 15px;
}

.location-item {
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
}

.location-item:hover {
  background-color: var(--beige);
}

.close-btn {
  width: 100%;
  padding: 10px;
  background-color: var(--light-bronze);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.close-btn:hover {
  background-color: #c09263;
}
</style>