<template>
  <main class="dashboard-page">
    <div class="dashboard-content-wrapper">
      <DashboardGrid />
    </div>
  </main>
</template>

<script setup>
/**
 * Main Portfolio Dashboard Entry Point.
 * Standardizes the layout wrapper for the grid components.
 */
import DashboardGrid from "@/modules/portfolio/components/DashboardGrid.vue";
</script>

<style scoped>
/* Define local variables for easy updates and zero duplicates */
.dashboard-page {
  --bg-gradient-start: #eaeaea;
  --bg-gradient-end: #f5f8f4;
  --page-padding: 0; /* Main reset as requested */

  min-height: 100vh;
  width: 100%;
  padding: var(--page-padding);
  background: linear-gradient(135deg, var(--bg-gradient-start), var(--bg-gradient-end));
  
  /* Use flex or grid here if you want the child to always be centered */
  display: flex;
  flex-direction: column;
}

.dashboard-content-wrapper {
  flex: 1;
  width: 100%;
  /* If you want a max-width for ultra-wide screens, add it here */
  margin: 0 auto;
}

/* Ensure no horizontal scroll from grid gutters */
:deep(.row) {
  margin-right: 0;
  margin-left: 0;
}
</style>