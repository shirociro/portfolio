<template>
  <b-card class="card-tech-stack" style="position: relative">
    <div class="mb-3">
      <h3 class="card-title mb-1 text-white">{{ technicalSkills.title }}</h3>
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
                class="skill-btn fw-semibold border-0 border-bottom border-white bg-transparent text-white"
                :style="skill.hover ? 'background-color:#2a7378;color:white;' : ''"
              >
                {{ skill.main }}
              </button>
              <div class="skill-tooltip fw-semibold">
                <ul class="mb-0">
                  <li
                    v-for="(detail, index) in skill.details"
                    :key="detail"
                     :class="{ 'fw-bold': index === 0 && ['Vue.JS','Node.js (Express)','PHP Custom MVC','Go (Fiber)','MySQL'].includes(skill.main) }"

                  >
                    {{ detail }}
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const technicalSkills = ref({ title: "Technical Skills" });

const skills = ref([
  { main: "Vue.JS", details: ["[5-year working Experience]","Composition API","Lifecycle Hooks","Dynamic Components","Composables","Pinia","Tanstack/VueQuery","Vue Router (Nested & Lazy Routes)","Slots","Reactive / Ref / Computed","Watchers / WatchEffect","Directives (v-if, v-for, v-model)","VueBootstrap","Vuetify","PrimeVue"], hover: false },
  { main: "React.JS", details: ["Component Architecture","State Management(Tanstackquery & Redux)","Hooks","Composition"] },
  { main: "UI Component Frameworks", details: ["Bootstrap","VueBootstrap","Tailwind","Flowbite","PrimeVue"] },
  { main: "Node.js (Express)", details: ["[2-year working Experience]","EventEmitter","Cluster","Modular/Feature Based Architecture","REST API","Versioned APIs","Middleware","Validation","JWT Auth","Security","Logging","File Uploads","NodeMailer","Environment Management","Streaming / Buffers","WebSocket / Socket.io"], hover: false },
  { main: "PHP Custom MVC", details: ["[2-year working Experience]","OOP / Object-Oriented Programming","Routing & Controllers","Services / Business Logic","Middleware","Session-based Authentication","PHPMailer / Email Handling"] },
  { main: ".NET Core (C#)", details: ["Web API Development","Entity Framework Core","Dependency Injection","Middleware & Routing"] },
  { main: "Go (Fiber)", details: ["[2-year working Experience]","REST API Development","Middleware & Routing","Concurrency / Goroutines","Database Integration","Error Handling & Logging","Validation & Security"], hover: false },
  { main: "MySQL", details: ["[6-year working Experience]","CTE/WITH","Joins","Normalization","Denormalization","Procedures","Functions","Events","Views","Triggers","Transactions","JSON"], hover: false },
  { main: "PostgreSQL", details: ["CTE/WITH","Joins","Normalization","Denormalization","Procedures","Functions","Events"] },
  { main: "Scripting/Automation", details: ["CronJobs","Powershell"], hover: false },
  { main: "HTML5", details: ["Semantic HTML","Boostrap 5","Tailwind"] },
  { main: "JavaScript", details: ["ES6+","Async / Await","Promises","DOM Manipulation","Axios"] },
  { main: "TypeScript", details: ["Static Typing","Interfaces","Generics"] },
  { main: "CSS3", details: ["Responsive Design","Styling","Layout"] },
  { main: "Git", details: ["Git Flow","Git CI/CD"] },
  { main: "Architectural Patterns", details: ["MVC","MVVM","Microservices","Monolith","Feature-Based"] },
]);

const skillGroups = computed(() => {
  const size = 3;
  const result = [];
  for (let i = 0; i < skills.value.length; i += size) {
    result.push(skills.value.slice(i, i + size));
  }
  return result;
});

const autoHoverEnabled = ref(true);
let hoverInterval = null;

onMounted(() => {
  hoverInterval = setInterval(() => {
    if (!autoHoverEnabled.value) return;
    const randomGroupIndex = Math.floor(Math.random() * skillGroups.value.length);
    const randomSkillIndex = Math.floor(Math.random() * skillGroups.value[randomGroupIndex].length);
    const randomSkill = skillGroups.value[randomGroupIndex][randomSkillIndex];
    randomSkill.hover = true;
    setTimeout(() => { randomSkill.hover = false; }, 1200);
  }, 2200);
});

const stopAutoHover = (skill) => {
  autoHoverEnabled.value = false;
  skillGroups.value.forEach((group) => group.forEach((s) => (s.hover = false)));
  skill.hover = true;
  if (hoverInterval) { clearInterval(hoverInterval); hoverInterval = null; }
};
</script>

<style>
.card-tech-stack {
  position: relative;
  top: 5px;
  border-radius: 10px;
  background: transparent;
  color: #12412d;
  padding: 20px;
  padding-top:0px;
  margin-top: 0px;
  border: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.skill-btn {
  padding: 6px 12px;
  background-color: #ffffff;
  color: #1b3c53;
  border: none;
  border-radius: 0;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.skill-btn:hover {
  background-color: #2a7378;
  color: #fff;
  transform: scale(1.05);
}

.tooltip-wrapper { position: relative; display: inline-block; z-index: 999; }
.skill-tooltip {
  position: absolute;
  left: 50%;
  bottom: 120%;
  transform: translateX(-50%);
  background-color: #fff5b1;
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

.tooltip-wrapper.tooltip-visible .skill-tooltip { opacity: 1; visibility: visible; }

@keyframes fadeSlideLeft {
  0% { opacity: 0; transform: translateX(-20px); }
  100% { opacity: 1; transform: translateX(0); }
}

.fade-slide-left { opacity: 0; animation: fadeSlideLeft 0.5s ease forwards; }
</style>