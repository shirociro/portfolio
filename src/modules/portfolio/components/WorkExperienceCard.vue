<template>
  <div class="work-slider-container">
    <div
      ref="slider"
      class="work-slider"
      :style="{ transform: `translateX(-${currentSlide * cardGap}px)` }"
    >
      <div
        class="work-card"
        v-for="(section, index) in workResponsibilities"
        :key="index"
        :class="{ center: index === centerIndex }"
      >
        <!-- Header Section -->
        <div class="card-header">
          <h4 class="">{{ section.category }}</h4>
        </div>

        <!-- Body Section -->
        <div class="card-body" style="z-index: 2!important;">
          <ul>
            <li class="" v-for="(task, i) in section.tasks" :key="i">
              {{ task }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from "vue";

const workResponsibilities = ref([
  {
    category: "Day-to-Day Tasks",
    tasks: [
      "Developed and maintained internal apps.",
      "Delivered new features.",
      "Debugged legacy code.",
    ],
  },
  {
    category: "Frontend Development",
    tasks: [
      "Built component-driven UI with Vue 3.",
      "Integrated REST APIs.",
      "Collaborated with UI/UX teams.",
    ],
  },
  {
    category: "Backend & APIs",
    tasks: [
      "Implemented REST APIs with Node.js & PHP.",
      "JWT-based auth.",
      "WebSockets & real-time features.",
    ],
  },
  {
    category: "Database & Data",
    tasks: [
      "MySQL 8+ with complex queries & JSON.",
      "Stored procedures, triggers, events.",
      "Optimized high-volume queries.",
    ],
  },
  {
    category: "DevOps & Deployment",
    tasks: [
      "Deployed apps to Linux & Windows servers.",
      "Managed production builds.",
      "Ensured live system stability.",
    ],
  },
  {
    category: "Automation & Scripting",
    tasks: [
      "Automated tasks with cron & PowerShell.",
      "Reduced manual workload.",
    ],
  },
  {
    category: "Collaboration & Support",
    tasks: [
      "Worked closely with clients.",
      "Coordinated with HR & accounting.",
      "Acted as bridge between teams.",
    ],
  },
]);

const slider = ref(null);
const currentSlide = ref(0);
const intervalId = ref(null);

let cardWidth = 0;
let cardGap = 0;

const computeCardSize = () => {
  if (!slider.value) return;
  const card = slider.value.querySelector(".work-card");
  if (card) {
    cardWidth = card.offsetWidth;
    const style = getComputedStyle(card);
    const marginRight = parseInt(style.marginRight);
    cardGap = cardWidth + marginRight;
  }
};

// Compute the index of the card in the center of the viewport
const centerIndex = computed(() => {
  // Since 3 cards visible at a time, the middle one is currentSlide + 1
  return (currentSlide.value + 1) % workResponsibilities.value.length;
});

const startAutoSlide = () => {
  intervalId.value = setInterval(() => {
    currentSlide.value =
      (currentSlide.value + 1) % workResponsibilities.value.length;
  }, 2500);
};

onMounted(() => {
  nextTick(() => {
    computeCardSize();
    startAutoSlide();
    window.addEventListener("resize", computeCardSize);
  });
});

onUnmounted(() => {
  clearInterval(intervalId.value);
  window.removeEventListener("resize", computeCardSize);
});
</script>

<style>
.work-slider-container {
  width: 100%;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
  background: #ffffff;
}

.work-slider {
  display: flex;
  gap: 50px;
  transition: transform 0.8s ease;
}

.work-card {
  flex: 0 0 30%; /* 3 cards per view */
  background: rgba(232, 219, 184, 0.8);
  /* background: rgb(68, 104, 98);   */

  border-radius: 0px;
  padding: 20px;
  box-sizing: border-box;
  border: 0px solid #78a291;

  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    opacity 0.3s ease;
  transform: scale(0.9);
  opacity: 0.7;
}

.work-card.center {
  transform: scale(1.25); /* bigger center */
  opacity: 1;
  border: 0px solid #78a291;
  z-index: 99;
}

.work-card h4 {
  margin-bottom: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  color: rgb(0, 83, 83);
  line-height: 1.3;
}

.work-card ul {
  padding-left: 18px;
  margin: 0;
}

.work-card li {
  margin-bottom: 6px;
  font-size: 0.875rem;
  line-height: 1.4;
  color: #333;
}

.work-card li::before {
  content: "•";
  color: #999;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

/* Small screens: 1 card per view */
@media (max-width: 768px) {
  .work-card {
    flex: 0 0 90%;
  }
}
</style>
