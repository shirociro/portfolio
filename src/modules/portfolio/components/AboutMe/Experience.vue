<template>
  <!-- Work Experience Card -->
  <b-card
    class="card-experience mb-0 pb-0"
    style="position: relative; z-index: 1; top: -100px"
  >
    <h2 class="fade-in" style="color: rgb(0, 83, 83)">
      {{ workExperience.title }}
    </h2>
    <h5 class="fade-in" style="color: rgb(130, 104, 2)">
      {{ workExperience.company }}
    </h5>
    <p class="fade-in">{{ workExperience.period }}</p>

    <b-card-text>
      <ul>
        <li
          class="fade-in"
          v-for="(task, index) in workExperience.tasks"
          :key="index"
        >
          {{ task }}
        </li>
      </ul>
    </b-card-text>
  </b-card>
</template>
<script setup>
import { ref } from "vue";
const workExperience = ref({
  title: "Work Experience",
  company: "MotivIT (US Based IT Services and Business Solutions)",
  period: "Feb 2019 – May 2025",
  tasks: [
    "Developed internal and client portals, HR applications, and business transaction systems.",
    "Built modular, feature-based frontend and backend code, ensuring clear separation of concerns, reusable services, and long-term scalability.",
    "Implemented REST APIs and real-time WebSocket features across multiple backend frameworks.",
    "Ensured secure and scalable solutions using JWT authentication, session-based authorization, and optimized MySQL databases.",
    "Automated operational processes with PowerShell scripts, cron jobs, and event schedulers.",
    "Troubleshot technical issues and optimized system performance for efficiency and reliability.",
  ],
});
</script>
