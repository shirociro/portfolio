<template>
  <b-card class="card-about-me">
    <header class="about-header">
      <h2 class="about-title">{{ aboutMe.title }}</h2>
    </header>
    
    <b-card-text class="about-description">
      {{ aboutMe.description }}
    </b-card-text>
  </b-card>
</template>

<script setup>
/**
 * About Me Component
 * Displays high-level professional summary with 6+ years experience.
 */
import { ref } from "vue";

const aboutMe = ref({
  title: "About Me",
  description:
    "Full-Stack Developer with 6+ years of experience delivering scalable, production-ready web applications. Strong expertise in frontend and backend development, feature-based architecture, and building clean, modular codebases optimized for long-term maintainability and team collaboration.",
});
</script>

<style scoped>
.card-about-me {
  /* Layout settings */
  position: relative;
  z-index: 1;
  top: -100px;
  
  /* Visual styling */
  background: rgba(0, 83, 83, 0.9); /* Matching your teal theme */
  border: none;
  border-radius: 0;
  padding: 1.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  color: #ffffff;
}

.about-title {
  font-weight: 700;
  margin-bottom: 1.25rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 1.5rem;
}

.about-description {
  font-size: 1.1rem;
  line-height: 1.7;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0;
}

/* Decorative accent to match the work experience gold */
.accent-line {
  position: absolute;
  left: 0;
  top: 20%;
  height: 60%;
  width: 4px;
  background-color: rgb(130, 104, 2); /* Your signature gold */
}

/* Ensure fade-in animations work if global classes are present */
.fade-in {
  animation: fadeIn 0.8s ease-in forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>