<template>
  <section class="hero-banner d-flex align-items-center">
    <div class="hero-bg">
      <img
        v-if="!loaded"
        :src="blurData"
        class="hero-img blur"
        alt=""
      />

      <img
        :src="realImage"
        class="hero-img real"
        :class="{ visible: loaded }"
        @load="loaded = true"
        alt=""
      />
    </div>

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
import { ref } from "vue";
import mainImage from "@/assets/main.png";
import { blurData } from "@/modules/portfolio/constants/blurData.js";
defineProps({
  name: { type: String, default: "RICO CARBONEL" },
  title: { type: String, default: "FullStack Web Developer" },
  description: {
    type: String,
    default:
      "Expert in modern JavaScript frontend frameworks like Vue 3 and React.js, backend development with Express.js, and modern full-stack architecture. Skilled at turning complex problems into simplified, scalable solutions.",
  },
});

const loaded = ref(false);
const realImage = mainImage;

</script>
<style scoped>
.hero-banner {
  --hero-teal: rgb(0, 83, 83);
  --hero-gold: rgb(130, 104, 2);
  --hero-height: 65vh;
  position: relative;
  height: var(--hero-height);
  min-height: 450px;
  width: 100%;
  overflow: hidden;
  background-color: #f8f9fa;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.hero-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.6s ease, filter 0.6s ease, transform 0.6s ease;
}

.blur {
  filter: blur(20px);
  transform: scale(1.1);
}

.real {
  opacity: 0;
}

.real.visible {
  opacity: 1;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  transition: background 0.5s ease;
}

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

@media (max-width: 991px) {
  .hero-banner {
    height: auto;
    padding: 6rem 0;
  }
  .hero-overlay {
    background: rgba(0, 0, 0, 0.5);
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