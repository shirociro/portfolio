<template>
  <b-card
    class="card-about-me text-white"
    style="position: relative; z-index: 1; top: -100px"
  >
    <h2 class="fade-in">{{ aboutMe.title }}</h2>
    <b-card-text class="fade-in text-white">
      {{ aboutMe.description }}
    </b-card-text>
  </b-card>
</template>
<script setup>
import { ref } from "vue";

const aboutMe = ref({
  title: "About Me",
  description:
    "Full-Stack Developer with 6+ years of experience delivering scalable, production-ready web applications. Strong expertise in frontend and backend development, feature-based architecture, and building clean, modular codebases optimized for long-term maintainability and team collaboration.",
});
</script>
