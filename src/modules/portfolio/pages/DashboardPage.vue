<template>
  <main class="dashboard-page">
    <div class="dashboard-content-wrapper">
      <DashboardGrid />
    </div>
  </main>
</template>

<script setup>
import DashboardGrid from "@/modules/portfolio/components/DashboardGrid.vue";


</script>

<style scoped>
.dashboard-page {
  --bg-gradient-start: #eaeaea;
  --bg-gradient-end: #f5f8f4;
  --page-padding: 0; 

  min-height: 100vh;
  width: 100%;
  padding: var(--page-padding);
  background: linear-gradient(135deg, var(--bg-gradient-start), var(--bg-gradient-end));
  
  display: flex;
  flex-direction: column;
}

.dashboard-content-wrapper {
  flex: 1;
  width: 100%;
  margin: 0 auto;
}

:deep(.row) {
  margin-right: 0;
  margin-left: 0;
}
</style>