<template>
  <!-- 固定导航栏 -->
  <nav class="navbar fixed-navbar">
    <!-- 标题区 -->
    <div class="navbar-header">
      <div class="logo" @click="$router.push('/')">Recuraim</div>
      <div class="location" @click="showLocationModal = true" @mouseenter="onLocationHover" @mouseleave="onLocationLeave">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="location-icon">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span>{{ displayLocation }}</span>
        <span class="dropdown-icon">▼</span>
      </div>
    </div>

    <!-- 导航栏 -->
    <div class="navbar-nav">
      <template v-if="!isRecruiter">
        <router-link to="/" class="nav-item" active-class="active">首页</router-link>
        <router-link to="/jobs" class="nav-item" active-class="active">职位</router-link>
        <router-link to="/questions" class="nav-item" active-class="active">问答</router-link>
        <div class="nav-right">
          <router-link to="/messages" class="nav-item" active-class="active">消息</router-link>
          <router-link to="/resume" class="nav-item" active-class="active">简历</router-link>
        </div>
      </template>
      <template v-else>
        <router-link to="/recruiter/jobs" class="nav-item" active-class="active">职位管理</router-link>
        <router-link to="/recruiter/candidates" class="nav-item" active-class="active">候选人</router-link>
        <div class="nav-right">
          <router-link to="/messages" class="nav-item" active-class="active">消息</router-link>
        </div>
      </template>
    </div>

    <!-- 个人信息 -->
    <div class="user-info" @mouseenter="onUserInfoHover" @mouseleave="hideUserMenu">
      <span class="user-name">用户</span>
      <div class="user-avatar"></div>
      <!-- 个人菜单 -->
      <div class="user-menu" v-if="showUserMenu" @mouseenter="onUserMenuHover" @mouseleave="hideUserMenu">
        <a href="#" class="menu-item" v-if="!isRecruiter">完善信息</a>
        <a href="#" class="menu-item" v-else>企业信息</a>
        <a href="#" class="menu-item" @click.prevent="toggleRole">{{ isRecruiter ? '切换为求职者' : '切换为招聘者' }}</a>
        <a href="/login" class="menu-item">退出登录</a>
      </div>
    </div>

    <!-- 地区选择模态框 -->
    <LocationModal 
      :visible="showLocationModal" 
      :current-location="currentLocation"
      @select="selectLocation"
      @close="showLocationModal = false"
    />
  </nav>
</template>

<script>
import LocationModal from './LocationModal.vue'

export default {
  name: 'Navbar',
  components: {
    LocationModal
  },
  data() {
    return {
      currentLocation: '北京',
      showLocationModal: false,
      showUserMenu: false,
      isLocationHovered: false,
      userMenuCloseTimer: null,
      isRecruiter: localStorage.getItem('userRole') === 'recruiter'
    }
  },
  computed: {
    displayLocation() {
      return this.isLocationHovered ? '选择' : this.currentLocation;
    }
  },
  methods: {
    selectLocation(location) {
      this.currentLocation = location;
      this.showLocationModal = false;
    },
    onLocationHover() {
      this.isLocationHovered = true;
    },
    onLocationLeave() {
      this.isLocationHovered = false;
    },
    hideUserMenu() {
      if (this.userMenuCloseTimer) {
        clearTimeout(this.userMenuCloseTimer);
      }
      this.userMenuCloseTimer = setTimeout(() => {
        this.showUserMenu = false;
      }, 200);
    },
    clearUserMenuCloseTimer() {
      if (this.userMenuCloseTimer) {
        clearTimeout(this.userMenuCloseTimer);
        this.userMenuCloseTimer = null;
      }
    },
    onUserInfoHover() {
      this.clearUserMenuCloseTimer();
      this.showUserMenu = true;
    },
    onUserMenuHover() {
      this.clearUserMenuCloseTimer();
      this.showUserMenu = true;
    },
    toggleRole() {
      this.isRecruiter = !this.isRecruiter;
      localStorage.setItem('userRole', this.isRecruiter ? 'recruiter' : 'jobseeker');
      if (this.isRecruiter) {
        this.$router.push('/recruiter/jobs');
      } else {
        this.$router.push('/');
      }
      this.showUserMenu = false;
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
  transition: all 0.3s;
}

.fixed-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
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
  gap: 8px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.3s;
  margin-right: 20px;
}

.location-icon {
  width: 16px;
  height: 16px;
  color: #666;
  transition: all 0.3s;
}

.location:hover .location-icon {
  color: var(--light-bronze);
  transform: scale(1.1);
}

.location:hover {
  color: var(--light-bronze);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dropdown-icon {
  font-size: 12px;
}

.navbar-nav {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  gap: 20px;
}

.nav-right {
  display: flex;
  gap: 20px;
  margin-left: auto;
  margin-right: 20px;
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
  font-size: 16px;
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
  min-width: 180px;
  transition: all 0.3s;
}

.menu-item {
  display: block;
  padding: 10px 20px;
  text-decoration: none;
  color: #333;
  transition: all 0.3s;
  white-space: nowrap;
}

.menu-item:hover {
  background-color: var(--beige);
  color: var(--light-bronze);
}


</style>