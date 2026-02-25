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
        :class="{ 
          center: index === centerIndex, 
          expanded: expandedIndex === index 
        }"
      >
        <div class="card-header">
          <h4>{{ section.category }}</h4>
        </div>

        <div class="card-body">
          <div class="tasks-wrapper" :class="{ 'is-open': expandedIndex === index }">
            <ul class="list-unstyled">
              <li v-for="(task, i) in section.tasks" :key="i">
                {{ task }}
              </li>
            </ul>
          </div>

          <button 
            class="btn btn-link p-0 mt-2 text-decoration-none fw-bold" 
            style="color: rgb(0, 83, 83); font-size: 0.8rem;"
            @click="toggleExpand(index)"
          >
            {{ expandedIndex === index ? 'See Less' : 'See More...' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from "vue";

// ... (keep your workResponsibilities data the same)

const expandedIndex = ref(null); // Track which card is open

const toggleExpand = (index) => {
  if (expandedIndex.value === index) {
    expandedIndex.value = null; // Close if clicked again
    startAutoSlide(); // Resume sliding
  } else {
    expandedIndex.value = index;
    clearInterval(intervalId.value); // Stop sliding while reading
  }
};

// ... (keep currentSlide, intervalId, cardWidth, cardGap refs)

const startAutoSlide = () => {
  // Only start if nothing is expanded
  if (expandedIndex.value !== null) return;
  
  intervalId.value = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % workResponsibilities.value.length;
  }, 2500);
};

// ... (keep computeCardSize, centerIndex, onMounted/Unmounted logic)
</script>

<style scoped>
/* Keep your existing slider styles ... */

.tasks-wrapper {
  max-height: 60px; /* How much text you want to show initially */
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
}

.tasks-wrapper.is-open {
  max-height: 500px; /* Large enough for full content */
}

.work-card {
  /* ... existing styles ... */
  height: fit-content;
  transition: transform 0.3s ease, opacity 0.3s ease, max-height 0.4s ease;
}

.work-card.center {
  transform: scale(1.1); /* Reduced scale slightly to accommodate expansion */
  opacity: 1;
  z-index: 99;
}

.work-card.expanded {
  z-index: 100; /* Ensure expanded card is on top */
}

/* Remove default dots if using custom symbols */
.list-unstyled {
  list-style: none;
  padding-left: 0;
}
</style>