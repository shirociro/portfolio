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
import Experience from "./AboutMe/Experience.vue";
import Profile from "./AboutMe/Profile.vue";
import TechnicalSkills from "./Skills/TechnicalSkills.vue";
</script>

<style scoped>
.card-experience {
  border-radius: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-about-me {
  border-radius: 10px;
  background: rgba(89, 74, 25, 0.911);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-tools {
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  color: white;
  padding: 20px;
  border: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style>