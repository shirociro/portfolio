<template>
  <component :is="layoutComponent" />
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const route = useRoute();

const layoutComponent = computed(() => DefaultLayout);


</script>

<style scoped>
html,
body {
  overflow: hidden;
}
</style>
