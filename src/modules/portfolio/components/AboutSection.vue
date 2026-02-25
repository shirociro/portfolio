<template>
  <section class="about-section-wrapper">
    <div class="container-fluid p-0">
      <div class="row g-4">
        
        <div class="col-lg-7 d-flex flex-column">
          <div class="card-stack">
            <AboutMeCard />
            <ExperienceCard />
          </div>
        </div>

        <div class="col-lg-5">
          <aside class="sticky-sidebar">
            <TechStackCard />
          </aside>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * AboutMe Orchestrator
 * Purpose: Manages the 7/5 grid split and responsive stacking.
 */
import AboutMeCard from "./AboutCard.vue";
import ExperienceCard from "./ExperienceCard.vue";
import TechStackCard from "./TechStackCard.vue";
</script>

<style scoped>
/* We keep the logic here focused strictly on the layout 
   and delegate specific card visuals to about.css 
*/
@import "./styles/about.css";

.about-section-wrapper {
  width: 100%;
  /* Buffer for the -100px top offset of child cards to prevent overlapping previous sections */
  margin-top: 100px; 
  padding-bottom: 50px;
}

.card-stack {
  display: flex;
  flex-direction: column;
  /* Adjust this gap to control vertical spacing between the cards */
  gap: 2rem; 
}

/* Enhances UX: Keeps the Tech Stack visible while scrolling long work experience */
@media (min-width: 992px) {
  .sticky-sidebar {
    position: sticky;
    top: 20px;
    height: fit-content;
  }
}

/* Reset for fluid width if container-fluid isn't enough */
.full-width {
  max-width: 100% !important;
}
</style>