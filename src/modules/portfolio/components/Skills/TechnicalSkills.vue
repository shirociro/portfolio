<template>
  <b-card class="card-tech-stack" style="position: relative">
    <div class="mb-3">
      <h3 class="card-title mb-1">{{ technicalSkills.title }}</h3>
    </div>
    <div class="row">
      <div
        class="col-12 col-md-12 mb-3"
        v-for="(group, index) in skillGroups"
        :key="index"
      >
        <div class="skill-group">
          <ul class="list-unstyled mb-0 d-flex flex-wrap gap-4">
            <li
              v-for="skill in group"
              :key="skill.main"
              class="skill-item tooltip-wrapper fade-slide-left"
              :class="{ 'tooltip-visible': skill.hover }"
              @mouseenter="stopAutoHover(skill)"
              @mouseleave="((skill.hover = false), (autoHoverEnabled = true))"
            >
              <button
                class="skill-btn fw-semibold"
                :style="
                  skill.hover == true
                    ? 'background-color:#2a7378;color:white;'
                    : ''
                "
              >
                {{ skill.main }}
              </button>

              <div class="skill-tooltip fw-semibold">
                <ul class="mb-0">
                  <li
                    class="fw-semibold"
                    v-for="detail in skill.details"
                    :key="detail"
                  >
                    {{ detail }}
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="mb-3">
        <h3 class="card-title mb-1">{{ toolsCard.title }}</h3>
      </div>
      <div class="row">
        <div
          class="col-3 col-md-3"
          v-for="(group, index) in toolsGroups"
          :key="index"
        >
          <div class="skill-group">
            <ul class="list-unstyled mb-0">
              <li v-for="tool in group" :key="tool" class="skill-item">
                {{ tool }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </b-card>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";

// ----- Technical Skills -----
const technicalSkills = ref({
  title: "Technical Skills",
});

const skills = ref([
  {
    main: "Vue.js",
    details: [
      // "Composition API", "Lifecycle Hooks", "Dynamic Components", "Composables", "Pinia", "Tanstack/VueQuery", "Vue Router(Nested & Lazy Routes)", "VueBootstrap","Vuetify", "PrimeVue"]
      "Composition API",
      "Lifecycle Hooks",
      "Dynamic Components",
      "Composables",
      "Pinia",
      "Tanstack/VueQuery",
      "Vue Router (Nested & Lazy Routes)",
      "Slots",
      "Reactive / Ref / Computed",
      "Watchers / WatchEffect",
      "Directives (v-if, v-for, v-model)",
      "VueBootstrap",
      "Vuetify",
      "PrimeVue",
    ],
    hover: false,
  },
  {
    main: "Node.js (Express)",
    details: [
      "EventEmitter",
      "Cluster",
      "Modular/Feature Based Architecture",
      "REST API",
      "Versioned APIs",
      "Middleware",
      "Validation",
      "JWT Auth",
      "Security",
      "Logging",
      "File Uploads",
      "NodeMailer",
      "Environment Management",
      "Streaming / Buffers",
      "WebSocket / Socket.io",
    ],
    hover: false,
  },
  {
    main: "PHP Custom MVC",
    details: [
      "OOP / Object-Oriented Programming",
      "Routing & Controllers",
      "Services / Business Logic",
      "Middleware",
      "Session-based Authentication",
      "PHPMailer / Email Handling",
    ],
  },
  {
    main: ".NET Core (C#)",
    details: [
      "Web API Development",
      "Entity Framework Core",
      "Dependency Injection",
      "Middleware & Routing"
    ]
  },
  {
    main: "Go (Fiber)",
    details: [
      "REST API Development",
      "Middleware & Routing",
      "Concurrency / Goroutines",
      "Database Integration",
      "Error Handling & Logging",
      "Validation & Security",
    ],
    hover: false,
  },
  {
    main: "MySQL",
    details: [
      "CTE/WITH",
      "Joins",
      "Normalization",
      "Denormalization",
      "Procedures",
      "Functions",
      "Events",
      "Views",
      "Triggers",
      "Transactions",
      "JSON",
    ],
    hover: false,
  },
  {
    main: "PostgreSQL",
    details: [
      "CTE/WITH",
      "Joins",
      "Normalization",
      "Denormalization",
      "Procedures",
      "Functions",
      "Events"
      ]  
  },
  {
    main: "Scripting/Automation",
    details: ["CronJobs", "Powershell"],
    hover: false,
  },
  { main: "HTML5", details: ["Semantic HTML", "Boostrap 5", "Tailwind"] },
  {
    main: "JavaScript",
    details: ["ES6+", "Async / Await", "Promises", "DOM Manipulation", "Axios"],
  },
  { main: "CSS3", details: ["Responsive Design", "Styling", "Layout"] },
  { main: "Git", details: ["Git Flow", "Git CI/CD"] },
  { main: "React.JS", details: ["Component Architecture", "State Management(Tanstackquery & Redux)", "Hooks", "Composition"] },
  { main: "Architectural Patterns", details: ["MVC", "MVVM", "Microservices", "Monolith", "Feature-Based"] },
  // { main: "Docker", details: ["Dockerfile"] }
]);

const skillGroups = computed(() => {
  const size = 3;
  const result = [];
  for (let i = 0; i < skills.value.length; i += size) {
    result.push(skills.value.slice(i, i + size));
  }
  return result;
});

// ----- Tools -----
const toolsCard = ref({
  title: "Tools",
});

const tools = ref(["GitHub", "Postman", "PgAdmin", "MySQL Workbench"]);

const toolsGroups = computed(() => {
  const size = 1;
  const result = [];
  for (let i = 0; i < tools.value.length; i += size) {
    result.push(tools.value.slice(i, i + size));
  }
  return result;
});

const autoHoverEnabled = ref(true);
let hoverInterval = null;
onMounted(() => {
  hoverInterval = setInterval(() => {
    if (!autoHoverEnabled.value) return;

    const randomGroupIndex = Math.floor(
      Math.random() * skillGroups.value.length,
    );

    const randomSkillIndex = Math.floor(
      Math.random() * skillGroups.value[randomGroupIndex].length,
    );

    const randomSkill = skillGroups.value[randomGroupIndex][randomSkillIndex];

    randomSkill.hover = true;

    setTimeout(() => {
      randomSkill.hover = false;
    }, 1200);
  }, 2200);
});
const stopAutoHover = (skill) => {
  autoHoverEnabled.value = false;

  skillGroups.value.forEach((group) => group.forEach((s) => (s.hover = false)));

  skill.hover = true;

  if (hoverInterval) {
    clearInterval(hoverInterval);
    hoverInterval = null;
  }
};
</script>
<style>
.card-tech-stack {
  position: relative;
  top: 20px;
  border-top-right-radius: 0px !important;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;

  background: rgba(252, 255, 233, 0.8);
  background: rgba(239, 255, 250, 0.8);
  background: rgba(252, 252, 175, 0.8);
  background: local;
  color: white !important;
  /* border-top: 1px solid white!important; */
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
  border-radius: 10px;
  padding: 20px;
  border: none;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.card-tech-stack {
  color: #12412d;
}
.skill-btn {
  padding: 6px 12px;
  background-color: #36919a;
  background-color: #fffdd0;
  background-color: #1b3c53;
  background-color: #ffffff;

  /* background: rgba(232, 219, 184, 0.8);  */

  color: #fff;
  color: #1b3c53;
  border: none;
  border-radius: 0px;
  cursor: pointer;
  font-size: 0.875rem;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.skill-btn:hover {
  background-color: #2a7378;
  color: #fff;
  transform: scale(1.05);
}

/* Tooltip wrapper */
.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

/* Tooltip itself */
.skill-tooltip {
  position: absolute;
  left: 50%;
  bottom: 120%;
  transform: translateX(-50%);
  background-color: #315558;
  background-color: #fff5b1;

  color: #fff;
  color: #232323;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 6px;
  min-width: 160px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  font-size: 0.75rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 10;
}

/* Arrow for tooltip */
.skill-tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: #111 transparent transparent transparent;
}

/* Show tooltip on hover */
.tooltip-wrapper:hover .skill-tooltip {
  opacity: 1;
  visibility: visible;
}

/* new */
.tooltip-wrapper .skill-tooltip {
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
}

.tooltip-wrapper.tooltip-visible .skill-tooltip {
  opacity: 1;
  visibility: visible;
}
@media (max-width: 575px) {
  .card-about-me,
  .card-experience,
  .card-tech-stack,
  .card-tools {
    top: 0px !important;
  }
  .card-tools,
  .card-tech-stack {
    background: linear-gradient(
      to right,
      #2f7f86 0%,
      #36919a 55%,
      #5fb4bc 100%
    );
  }
}
/* Pop-in animation: fades in while scaling up */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 1s ease forwards;
}
@keyframes fadeSlideLeft {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-slide-left {
  opacity: 0; /* start hidden */
  animation: fadeSlideLeft 0.5s ease forwards;
}
</style>
