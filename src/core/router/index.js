import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/portfolio",
      name: "Portfolio",
      component: () => import("@/modules/portfolio/pages/DashboardPage.vue"),
      meta: { layout: "default" }, 
    },
    // 👇 fallback route
    {
      path: "/:pathMatch(.*)*",
      redirect: "/portfolio",
    },
  ],
});


export default router;
