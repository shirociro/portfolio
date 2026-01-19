<template>
  <nav class="mobile-navbar">
    <div class="navbar-links">
      <router-link
        v-for="item in items"
        :key="item.label"
        :to="item.path"
        class="navbar-item"
      >
        <i :class="item.icon" class="me-2"></i>
        <span>{{ item.label }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
const items = [
  { path: "/tasks", icon: "bi bi-list-check", label: "Tasks" },
  { path: "/knowledgebase", icon: "bi bi-book", label: "Knowledgebase" },
  { path: "/users", icon: "bi bi-people", label: "Users" },
];
</script>

<style scoped>
.mobile-navbar {
  background-color: #1e1e2f;
  color: white;
  padding: 0.6rem 0.75rem;
  position: relative;
  /*  removed z-index */
  border-radius: 0; /* no rounded edges since it's a subbar */
}

/* Links container */
.navbar-links {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 0.5rem;
}

/* Each link */
.navbar-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: white;
  text-decoration: none;
  padding: 0.4rem 0.6rem;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
  font-size: 0.9rem;
  font-weight: 400;
}

.navbar-item i {
  font-size: 1.1rem;
}

.navbar-item:hover {
  transform: translateY(-1px);
  color: #f5f5f5;
}

/*  Active link = bold text (no background) */
.router-link-active {
  font-weight: 600;
}

/*  Only show on mobile */
@media (min-width: 769px) {
  .mobile-navbar {
    display: none;
  }
}
</style>
