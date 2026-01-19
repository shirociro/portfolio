<template>
  <component :is="layoutComponent" />
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import MainLayout from "@/common/layouts/MainLayout.vue";
import AuthLayout from "@/common/layouts/AuthLayout.vue";
import DefaultLayout from "@/common/layouts/DefaultLayout.vue";

import { useAuthStore } from "@/modules/auth/store/authStore";
// import { useNotificationsStore } from '@/stores/notifications'

import { api } from "@/common/api";

const route = useRoute();
const auth = useAuthStore();

const layoutComponent = computed(() =>
  route.meta?.layout === "auth"
    ? AuthLayout
    : route.meta?.layout === "default"
      ? DefaultLayout
      : MainLayout,
);

if (auth.accessToken) {
  api.defaults.headers.common.Authorization = `Bearer ${auth.accessToken}`;
}

onMounted(async () => {
  // const metaStore = useMetaStore()
  // const notificationStore = useNotificationsStore()
  const user = JSON.parse(localStorage.getItem("user"));

  // await metaStore.fetchMeta()
  // await notificationStore.fetchMyNotifications(user.id)
});
</script>

<style scoped>
html,
body {
  overflow: hidden;
}
</style>
