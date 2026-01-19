<template>
  <div class="sidebar-container">
    <div
      class="sidebar pt-5"
      :class="{ expanded: isHovered }"
      @mouseenter="startHoverTimer"
      @mouseleave="startLeaveTimer"
    >
      <!-- Sidebar buttons -->
      <router-link
        v-for="item in items"
        :key="item.label"
        :to="item.path"
        @click="startLeaveTimer"
        class="sidebar-item p-2 m-0"
      >
        <div class="icon">
          <i :class="item.icon"></i>
        </div>
        <transition name="fade">
          <div v-if="isHovered" class="label">
            {{ item.label }}
          </div>
        </transition>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isHovered = ref(false);
let hoverTimer = null;
let leaveTimer = null;

const items = [
  { path: "/users", icon: "bi bi-people", label: "Users" },
  { path: "/stacks", icon: "bi bi-list-check", label: "Stacks" },
  // { path: "/knowledgebase", icon: "bi bi-book", label: "Knowledgebase" },
];

function startHoverTimer() {
  if (leaveTimer) clearTimeout(leaveTimer);
  hoverTimer = setTimeout(() => {
    isHovered.value = true;
  }, 200); // expand after 0.5s
}

function startLeaveTimer() {
  if (hoverTimer) clearTimeout(hoverTimer);
  leaveTimer = setTimeout(() => {
    isHovered.value = false;
  }, 200); // collapse after 0.3s
}
</script>

<style scoped>
/* Layout */
.sidebar-container {
  display: flex;
  z-index: 9999;
  height: 100%;
}

/* Sidebar */
.sidebar {
  width: 60px;
  height: 100%;
  background-color: #1e1e2f;
  border-radius: 12px;
  padding: 0.75rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  transition: width 0.3s ease-in-out;
}

.sidebar.expanded {
  width: 200px;
}

/* Items */
.sidebar-item {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.6rem 0.75rem;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.25s ease;
}

.sidebar-item:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

/* Icons */
.icon {
  width: 40px;
  text-align: center;
  font-size: 1.4rem;
  flex-shrink: 0;
}

/* Labels */
.label {
  margin-left: 0.25rem;
  white-space: nowrap;
  font-size: 0.95rem;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.sidebar.expanded .label {
  opacity: 1;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
