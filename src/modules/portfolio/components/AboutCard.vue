<template>
  <div class="about-me-container container full-width p-0">
    <div class="row">
      <div class="col-lg-7">
        <Profile />
        <Experience />
      </div>
      <div class="col-lg-5">
        <TechnicalSkills />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Experience from "./AboutMe/Experience.vue";
import Profile from "./AboutMe/Profile.vue";
import TechnicalSkills from "./Skills/TechnicalSkills.vue";
</script>

<style scoped>
.card-experience {
  border-top-right-radius: 0px !important;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;

  background: rgba(255, 255, 255, 1);

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  border: none;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.card-about-me {
  border-top-right-radius: 0px !important;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;

  /* background: rgba(50, 73, 65, 0.8); */
  background: rgba(89, 74, 25, 0.911);

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  border: none;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.card-tools {
  color: white;
  border-top-right-radius: 0px !important;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;

  background: rgba(233, 255, 249, 0.8);
  background: rgba(252, 252, 175, 0.8);
  background: rgba(209, 232, 206, 0.8);
  background: rgba(255, 255, 255, 0.8);
  background: none;
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
  border-radius: 10px;
  padding: 20px;
  border: none;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
</style>
