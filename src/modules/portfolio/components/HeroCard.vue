<template>
  <section class="hero-banner d-flex align-items-center">
    <div class="hero-bg"></div>
    <div class="hero-overlay"></div>

    <div class="container position-relative">
      <div class="row">
        <div class="col-lg-7 col-md-10 text-content">
          <h1 class="hero-title">{{ name }}</h1>
          <h5 class="hero-subtitle">{{ title }}</h5>
          <p class="hero-description">{{ description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  name: { type: String, default: "RICO CARBONEL" },
  title: { type: String, default: "FullStack Web Developer" },
  description: {
    type: String,
    default: "Expert in modern JavaScript frontend frameworks like Vue 3 and React.js, backend development with Express.js, and modern full-stack architecture. Skilled at turning complex problems into simplified, scalable solutions.",
  },
});
</script>

<style scoped>
.hero-banner {
  /* Variables for consistency */
  --hero-teal: rgb(0, 83, 83);
  --hero-gold: rgb(130, 104, 2);
  --hero-height: 65vh;
  
  position: relative;
  height: var(--hero-height);
  min-height: 450px;
  width: 100%;
  overflow: hidden;
  background-color: #f8f9fa; /* Fallback */
}

/* Background Image Layer */
.hero-bg {
  position: absolute;
  inset: 0;
  background-image: url("@/assets/main.png");
  background-size: cover;
  background-position: center;
  z-index: 0;
}

/* Overlay for contrast */
.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%);
  transition: background 0.5s ease;
}

/* Typography & Content */
.text-content {
  position: relative;
  z-index: 2;
  animation: fadeInRightToLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: var(--hero-teal);
  margin-bottom: 0.75rem;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--hero-gold);
  margin-bottom: 1.5rem;
}

.hero-description {
  font-size: 1.1rem;
  color: #4a4a4a;
  line-height: 1.7;
  max-width: 550px;
}

/* Animations */
@keyframes fadeInRightToLeft {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Mobile Responsiveness - One clean block */
@media (max-width: 991px) {
  .hero-banner {
    height: auto;
    padding: 6rem 0;
  }

  .hero-overlay {
    background: rgba(0, 0, 0, 0.5); /* Darken for mobile readability */
  }

  .hero-title, 
  .hero-subtitle, 
  .hero-description {
    color: #ffffff;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }

  .hero-description {
    opacity: 0.9;
  }
}
</style>