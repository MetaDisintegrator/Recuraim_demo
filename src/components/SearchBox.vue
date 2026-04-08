<template>
  <div class="search-box">
    <input type="text" placeholder="搜索职位、公司或关键词" />
    <button class="search-btn">
      <img src="../assets/icons/search.png" alt="search" class="search-icon">
    </button>
  </div>
</template>

<script>
export default {
  name: 'SearchBox'
}
</script>

<style scoped>
.search-box {
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  border: 2px solid var(--light-bronze);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.search-box:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.search-box input {
  flex: 1;
  padding: 14px 20px;
  border: none;
  background-color: white;
  color: #333;
  font-size: 14px;
  outline: none;
}

.search-btn {
  padding: 0 24px;
  background-color: var(--light-bronze);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}

.search-btn:hover {
  background-color: #c09263;
  transform: scale(1.05);
}

.search-icon {
  width: 16px;
  height: 16px;
  filter: brightness(0) invert(1);
  transition: all 0.3s;
}

.search-btn:hover .search-icon {
  transform: scale(1.1);
}
</style>