<template>
  <div class="modal" v-if="visible" @click="close">
    <div class="modal-content" @click.stop>
      <h3>选择地区</h3>
      <div class="search-box">
        <input type="text" placeholder="搜索地区" v-model="searchQuery" />
      </div>
      <div class="location-grid">
        <div class="location-item" v-for="location in filteredLocations" :key="location" @click="selectLocation(location)">
          {{ location }}
        </div>
      </div>
      <button class="close-btn" @click="close">关闭</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LocationModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    currentLocation: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchQuery: '',
      locations: [
        '北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安', '南京', '天津',
        '苏州', '重庆', '长沙', '青岛', '宁波', '郑州', '大连', '厦门', '济南', '哈尔滨',
        '福州', '昆明', '南昌', '贵阳', '太原', '石家庄', '南宁', '乌鲁木齐', '兰州', '西宁',
        '拉萨', '银川', '呼和浩特', '海口', '珠海', '汕头', '东莞', '佛山', '惠州', '中山'
      ]
    }
  },
  computed: {
    filteredLocations() {
      if (!this.searchQuery) {
        return this.locations;
      }
      return this.locations.filter(location => 
        location.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    selectLocation(location) {
      this.$emit('select', location);
      this.close();
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
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
  border-radius: 12px;
  padding: 24px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.modal-content h3 {
  margin-bottom: 20px;
  color: var(--light-bronze);
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}

.search-box {
  margin-bottom: 20px;
}

.search-box input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s;
}

.search-box input:focus {
  outline: none;
  border-color: var(--light-bronze);
  box-shadow: 0 0 0 2px rgba(192, 146, 99, 0.1);
}

.location-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.location-item {
  padding: 10px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s;
  text-align: center;
  font-size: 14px;
  background-color: rgba(233, 237, 201, 0.3);
  border: 1px solid rgba(233, 237, 201, 0.5);
}

.location-item:hover {
  background-color: var(--beige);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: var(--light-bronze);
}

.close-btn {
  width: 100%;
  padding: 12px;
  background-color: var(--light-bronze);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(192, 146, 99, 0.3);
}

.close-btn:hover {
  background-color: #c09263;
  transform: scale(1.02);
  box-shadow: 0 6px 16px rgba(192, 146, 99, 0.4);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    padding: 20px;
  }
  
  .location-grid {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    gap: 10px;
  }
  
  .location-item {
    padding: 8px;
    font-size: 13px;
  }
}
</style>