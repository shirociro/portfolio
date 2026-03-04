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
import AboutMeCard from "./AboutCard.vue";
import ExperienceCard from "./ExperienceCard.vue";
import TechStackCard from "./TechStackCard.vue";
</script>

<style scoped>
@import "./styles/about.css";

.about-section-wrapper {
  width: 100%;
  margin-top: 100px;
  padding-bottom: 50px;
}

.card-stack {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 992px) {
  .sticky-sidebar {
    position: sticky;
    top: 20px;
    height: fit-content;
  }
}

.full-width {
  max-width: 100% !important;
}
</style>