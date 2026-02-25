<template>
  <div class="work-experience-container">
    <b-card class="card-experience">
      <header class="card-header-content">
        <h2 class="title-primary">{{ workExperience.title }}</h2>
        <h5 class="title-secondary">{{ workExperience.company }}</h5>
        <p class="text-muted small">{{ workExperience.period }}</p>
      </header>

      <b-card-text>
        <ul class="list-unstyled task-list">
          <li v-for="(task, index) in workExperience.tasks" :key="index">
            <span class="bullet">•</span> {{ task }}
          </li>
        </ul>
        
        <button @click="showFullDetails = true" class="btn-trigger">
          See Project Details →
        </button>
      </b-card-text>
    </b-card>

    <transition name="overlay-fade">
      <div v-if="showFullDetails" class="details-overlay">
        <div class="container py-5">
          <header class="overlay-header">
            <h1 class="title-primary">Detailed Contributions</h1>
           <button @click="showFullDetails = false" class="btn-close-modern">
            <span class="icon">✕</span>
            <span class="text">CLOSE</span>
          </button>
          </header>

          <div class="row g-4">
            <div 
              class="col-md-6" 
              v-for="(item, index) in detailedWorkData" 
              :key="index"
            >
              <article class="detail-item-card">
                <h4 class="title-secondary">{{ item.projectTitle }}</h4>
                <div class="tech-badge">
                  <strong>Stack:</strong> {{ item.tech }}
                </div>
                <p class="description">{{ item.description }}</p>
                <ul class="sub-tasks">
                  <li v-for="sub in item.highlights" :key="sub">{{ sub }}</li>
                </ul>
              </article>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showFullDetails = ref(false);

const workExperience = ref({
  title: "Work Experience",
  company: "MotivIT",
  period: "Feb 2019 – May 2025",
  tasks: [
    "Developed internal and client portals, HR applications, and business transaction systems.",
    "Built modular, feature-based code ensuring clear separation of concerns and long-term scalability.",
    "Implemented REST APIs and real-time WebSocket features across multiple frameworks.",
    "Engineered secure solutions using JWT and optimized MySQL 8+ databases.",
    "Automated operational processes via PowerShell, cron jobs, and event schedulers.",
    "Maintained and optimized legacy codebases for efficiency and reliability."
  ],
});

const detailedWorkData = ref([
  {
    projectTitle: "Full-Stack Enterprise Applications",
    tech: "Vue 3 • Node.js (Express) • PHP • MySQL 8+",
    description: "Developed and maintained front-end and back-end components for internal and client-facing web applications, including management portals, pawnshop transaction systems, accounting reports, and HR platforms.",
    highlights: [
      "Delivered scalable, modular codebases following strict separation-of-concerns principles.",
      "Implemented RESTful APIs using Node.js (Express) and PHP with JWT authentication.",
      "Integrated Vue 3 (Composition API, Pinia, TanStackQuery) with Axios for structured API communication.",
      "Delivered new production features and system enhancements."
    ]
  },
  {
    projectTitle: "Database Engineering & Optimization",
    tech: "MySQL 8+ • JSON Data Types • Stored Procedures • Triggers",
    description: "Engineered advanced relational and hybrid SQL/JSON database architectures for high-volume financial and transactional systems.",
    highlights: [
      "Optimized complex queries and refactored heavy joins to reduce latency.",
      "Implemented stored procedures, functions, triggers, and scheduled events.",
      "Designed JSON-based dynamic data flows combining structured and semi-structured data.",
      "Automated database-level updates directly within the engine."
    ]
  },
  {
    projectTitle: "Real-Time Systems & Secure Communication",
    tech: "WebSockets • Pusher.js • JWT • Axios",
    description: "Developed secure communication layers and real-time system synchronization for transaction-critical platforms.",
    highlights: [
      "Integrated JWT authentication to secure sensitive financial endpoints.",
      "Implemented live dashboard and transaction updates via WebSockets and Pusher.js.",
      "Structured API consumption using Axios and TanStackQuery for maintainable data flow."
    ]
  },
  {
    projectTitle: "Deployment, Automation & System Maintenance",
    tech: "Linux • Microsoft Servers • Cron Jobs • PowerShell",
    description: "Deployed, maintained, and modernized production systems while automating operational workflows.",
    highlights: [
      "Deployed applications to Linux and Microsoft server environments.",
      "Automated recurring tasks using cron jobs, Windows Task Scheduler, and PowerShell scripts.",
      "Performed manual testing prior to QA handover to ensure UI stability and responsiveness.",
      "Debugged and maintained legacy front-end and back-end codebases."
    ]
  },
  {
    projectTitle: "Cross-Functional Collaboration & Client Support",
    tech: "Client Communication • UI/UX Collaboration • Business Systems",
    description: "Worked closely with stakeholders and internal teams to deliver business-aligned technical solutions.",
    highlights: [
      "Collaborated with UI/UX teams for interface design and usability improvements.",
      "Coordinated with HR and accounting teams for reports and process updates.",
      "Provided direct client support for workflow clarifications, issues, and bug resolutions."
    ]
  }
]);
</script>

<style scoped>
/* Branding Variables */
.work-experience-container {
  --color-teal: rgb(0, 83, 83);
  --color-gold: rgb(130, 104, 2);
  --color-bg-light: #fdfdfd;
  --transition-speed: 0.3s;
}

/* Card Styling */
.card-experience {
  position: relative;
  z-index: 1;
  top: -100px;
  padding-left: 15px;
  border-radius: 0;
  border: none;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

.title-primary { color: var(--color-teal); font-weight: 700; }
.title-secondary { color: var(--color-gold); font-weight: 600; }

.task-list li {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.bullet { color: var(--color-gold); margin-right: 8px; }

/* Buttons */
.btn-trigger {
  background: transparent;
  border: none;
  color: var(--color-gold);
  font-weight: bold;
  padding: 5px 0;
  border-bottom: 2px solid transparent;
  transition: var(--transition-speed);
}

.btn-trigger:hover {
  border-bottom-color: var(--color-gold);
  letter-spacing: 0.5px;
}

/* Overlay Styling */
.details-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--color-bg-light);
  z-index: 2000;
  overflow-y: auto;
}

.overlay-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.detail-item-card {
  background: #fff;
  padding: 2rem;
  border-left: 4px solid var(--color-teal);
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  height: 100%;
  transition: transform var(--transition-speed);
}

.detail-item-card:hover {
  transform: translateY(-5px);
}

.tech-badge {
  font-size: 0.85rem;
  color: #555;
  background: #f0f0f0;
  padding: 4px 10px;
  display: inline-block;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.sub-tasks {
  font-size: 0.9rem;
  color: #444;
  padding-left: 1.2rem;
  margin-top: 1rem;
}

.btn-close-modern {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--color-teal);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 50px; /* Capsule shape */
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 83, 83, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-close-modern .icon {
  font-size: 1.1rem;
  transition: transform var(--transition-speed);
}

.btn-close-modern:hover {
  background: #004242; /* Slightly darker teal */
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 83, 83, 0.3);
}

.btn-close-modern:hover .icon {
  transform: rotate(90deg); /* Playful rotation */
}

.btn-close-modern:active {
  transform: translateY(0);
}

/* Optional: Make the header sticky so the close button is always there */
.overlay-header {
  position: sticky;
  top: 0;
  background: var(--color-bg-light);
  padding: 20px 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

/* Transitions */
.overlay-fade-enter-active, 
.overlay-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.overlay-fade-enter-from, 
.overlay-fade-leave-to {
  opacity: 0;
  transform: scale(0.98) translateY(10px);
}
</style>