<template>
  <div class="app-layout d-flex">
    <Sidebar class="sidebar-fixed" />
    <div id="app-container" class="flex-grow-1 d-flex flex-column">
      <main class="p-0">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/common/components/Sidebar.vue";
</script>

<style scoped>
#app-container {
  margin-left: 60px;
}
.sidebar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 9999;
  transition: all 0.3s ease;
}
.flex-grow-1 {
  transition: margin-left 0.3s ease;
}
@media (max-width: 768px) {
  .sidebar-fixed {
    display: none;
  }
  #app-container {
    margin-left: 0px;
  }
}
</style>
