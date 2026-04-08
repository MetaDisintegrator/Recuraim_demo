<template>
  <div class="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
:root {
  --tea-green: #ccd5aeff;
  --beige: #e9edc9ff;
  --cornsilk: #fefae0ff;
  --papaya-whip: #faedcdff;
  --light-bronze: #d4a373ff;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: var(--cornsilk);
  color: #333;
}

.app {
  min-height: 100vh;
}
</style>
