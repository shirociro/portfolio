<template>
  <section
    class="hero-banner d-flex align-items-center p-5"
    style="border-bottom-right-radius: 0px"
  >
    <!-- Overlay for subtle contrast -->
    <div class="overlay"></div>

    <div class="container position-relative z-1">
      <div class="row">
        <div class="col-lg-7 col-md-10 text-content">
          <h1 class="hero-title mb-3">{{ name }}</h1>
          <h5 class="hero-subtitle mb-4 fw-semibold">{{ title }}</h5>
          <p class="hero-description mb-5">{{ description }}</p>
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
    default:
      "Expert in modern JavaScript frontend frameworks like Vue 3 and React.js, backend development with Express.js, and modern full-stack architecture. Skilled at turning complex problems into simplified, scalable solutions.",
  },
});
</script>

<style scoped>
.hero-banner {
  position: relative;
  height: 65vh; /* 60% of viewport height */
  min-height: 400px;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: all 0.5s ease; /* smooth entrance/hover transitions */
}

/* Brightened background using pseudo-element */
.hero-banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-image: url("@/assets/hero-image.jpg"); */
  background-image: url("@/assets/main.png");

  background-size: cover;
  background-position: center;
  transition: filter 0.5s ease; /* smooth brightness transitions */
  z-index: 0;
}

/* Subtle overlay for text readability */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  transition: background 0.5s ease;
}

/* Smooth fade-in from right to left */
@keyframes fadeInRightToLeft {
  0% {
    opacity: 0;
    transform: translateX(50px); /* Start 50px to the right */
  }
  100% {
    opacity: 1;
    transform: translateX(0); /* End at original position */
  }
}

/* Apply the new animation */
.text-content {
  z-index: 1;
  padding-top: 2rem;
  max-width: 600px;
  animation: fadeInRightToLeft 1s ease forwards; /* changed animation */
}

/* Typography for modern sleek look */
.hero-title {
  font-size: 3.5rem;
  font-weight: 600;
  line-height: 1.2;
  color: #3a3a3a;
  color: rgb(0, 83, 83);
  font-weight: 600;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 300;
  color: #3e3e3ecc; /* slightly transparent for subtlety */
  color: rgb(0, 83, 83);
  color: rgb(130, 104, 2);
  font-weight: 400;
}

.hero-description {
  font-size: 1rem;
  font-weight: 400;
  color: #626262dd;
  line-height: 1.6;
}

/* Sleek modern button */
.btn-modern {
  background-color: rgba(40, 167, 69, 0.85);
  color: #fff;
  border-radius: 50px;
  padding: 0.8rem 2rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.btn-modern:hover {
  background-color: rgba(40, 167, 69, 1);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Responsive adjustments */
@media (max-width: 991px) {
  /* Darken image slightly for contrast */
  .overlay {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.55),
      rgba(0, 0, 0, 0.35)
    );
  }

  /* Strong but clean text contrast */
  .hero-title,
  .hero-subtitle,
  .hero-description {
    color: #ffffff;
    text-shadow:
      0 1px 2px rgba(0, 0, 0, 0.8),
      0 4px 10px rgba(0, 0, 0, 0.6);
  }

  .hero-title {
    font-size: 2.9rem;
    letter-spacing: 0.02em;
  }

  .hero-subtitle {
    font-size: 1.5rem;
    opacity: 0.95;
  }

  .hero-description {
    font-size: 0.95rem;
    line-height: 1.5;
    opacity: 0.9;
  }
}
@media (max-width: 575px) {
  /* Darken image slightly for contrast */
  .overlay {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.55),
      rgba(0, 0, 0, 0.35)
    );
  }

  /* Strong but clean text contrast */
  .hero-title,
  .hero-subtitle,
  .hero-description {
    color: #ffffff;
    text-shadow:
      0 1px 2px rgba(0, 0, 0, 0.8),
      0 4px 10px rgba(0, 0, 0, 0.6);
  }

  .hero-title {
    font-size: 2.9rem;
    letter-spacing: 0.02em;
  }

  .hero-subtitle {
    font-size: 1.5rem;
    opacity: 0.95;
  }

  .hero-description {
    font-size: 0.95rem;
    line-height: 1.5;
    opacity: 0.9;
  }
}
</style>
