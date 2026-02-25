<template>
  <section class="dashboard-grid">
    <HeroCard />
    <!-- <SkillsCard class="p-2"/> -->
    <AboutCard class="dashboard-grid-about" style="height: 520px !important" />
    <!-- <ProjectsCard /> -->
    <!-- <WorkExperienceCard class="dashboard-grid-exp p-5" style="z-index: 99999" /> -->
  </section>
</template>

<script setup>
import HeroCard from "./HeroCard.vue";
import AboutCard from "./AboutCard.vue";
// import SkillsCard from "./SkillsCard.vue";
// import WorkExperienceCard from "./WorkExperienceCard.vue";
// import ProjectsCard from "./ProjectsCard.vue";
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

/* .dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  gap: 1.5rem;
} */
@media (max-width: 575px) {
  .dashboard-grid {
    height: auto !important;
  }
}
.dashboard-grid-exp {
  background: #fff8e2;
}
</style>
