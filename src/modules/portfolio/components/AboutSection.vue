<template>
  <div class="about-me-container container full-width p-0">
    <div class="row">
      <div class="col-lg-7">
        <AboutMeCard />
        <ExperienceCard />
      </div>

      <div class="col-lg-5">
        <TechStackCard />
      </div>
    </div>
  </div>
</template>

<script setup>
import AboutMeCard from "./AboutCard.vue";
import ExperienceCard from "./ExperienceCard.vue";
import TechStackCard from "./TechStackCard.vue";
</script>

<style scoped>
@import "./styles/about.css";
</style>
