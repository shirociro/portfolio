<template>
  <section class="dashboard-grid">
    <HeroCard />
    <!-- <SkillsCard class="p-2"/> -->
    <AboutCard class="dashboard-grid-about" style="height: 100vh !important" />
  </section>
</template>

<script setup>
import HeroCard from "./HeroCard.vue";
import AboutCard from "./AboutCard.vue";
</script>
<style>
.dashboard-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: linear-gradient(to right, #2f7f86 0%, #36919a 55%, #5fb4bc 100%);
}
.dashboard-grid::after {
  background: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.03) 0,
    rgba(255, 255, 255, 0.03) 1px,
    transparent 1px,
    transparent 3px
  );
  opacity: 0.25;
}

.dashboard-grid {
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
}
@media (max-width: 575px) {
  .dashboard-grid {
    height: auto !important;
  }
}
.dashboard-grid-exp {
  background: #fff8e2;
}

</style>
<style scoped>
.dashboard-grid-about {
  /* Default: Height for mobile/small screens */
  /* height: 950px !important;  */
}

/* Bootstrap 'Large' breakpoint (992px and up) */

</style>