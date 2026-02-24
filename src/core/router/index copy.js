import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/modules/auth/store/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("@/modules/auth/pages/LoginPage.vue"),
      meta: { layout: "auth" },
    },
    {
      path: "/users",
      name: "Users",
      component: () => import("@/modules/users/pages/UsersPage.vue"),
      meta: { requiresAuth: true, layout: "app" },
      children: [
        {
          path: "",
          name: "UsersList",
          component: () => import("@/modules/users/pages/UsersList.vue"),
        },
      ],
    },
    {
      path: "/stacks",
      name: "Stacks",
      component: () => import("@/modules/stacks/pages/StacksPage.vue"),
      meta: { requiresAuth: true, layout: "app" },
      children: [
        {
          path: "",
          name: "StacksList",
          component: () => import("@/modules/stacks/pages/StacksList.vue"),
        },
      ],
    },
    {
      path: "/portfolio",
      name: "Portfolio",
      component: () => import("@/modules/portfolio/pages/DashboardPage.vue"),
      meta: { requiresAuth: false, layout: "default" },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/users",
    },
  ],
});

/**
 * Global Auth Guard
 */
router.beforeEach((to) => {
  const auth = useAuthStore();

  // 🔒 Require authentication
  if (to.meta.requiresAuth && !auth.accessToken) {
    return { name: "Login" };
  }

  // 🚫 Prevent logged-in users from visiting login page
  if (to.name === "Login" && auth.accessToken) {
    return { name: "Users" };
  }
});

/**
 * 🔄 Auto logout when token removed (multi-tab support)
 */
window.addEventListener("storage", (event) => {
  if (event.key === "accessToken" && !event.newValue) {
    const auth = useAuthStore();
    auth.logout();
    router.push({ name: "Login" });
  }
});

export default router;
