<template>
  <main class="dashboard-page p-0">
    <DashboardGrid />
  </main>
</template>

<script setup>
import DashboardGrid from "@/modules/portfolio/components/DashboardGrid.vue";
</script>

<style>
.dashboard-page {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #eaeaea, #f5f8f4);
}
</style>
