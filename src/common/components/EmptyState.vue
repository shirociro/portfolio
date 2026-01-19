<!-- <template>
  <div v-if="showEmptyState" class="text-center py-5 w-100">
    <i class="bi bi-inbox fs-1 text-muted d-block mb-2"></i>
    <p class="text-muted fs-5 mb-0">No available data to show</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
// import { useUsersStore } from '@/modules/users/store/usersStore'

const route = useRoute();
// const usersStore = useUsersStore()

const showEmptyState = computed(() => {
  if (route.name === "UsersList") {
    // return !usersStore.loading && usersStore.allUsers.length === 0
  }
  return false;
});
</script> -->

<template>
  <div class="text-center py-5 w-100">
    <i class="bi bi-inbox fs-1 text-muted d-block mb-2"></i>
    <p class="text-muted fs-5 mb-0">No available data to show</p>
  </div>
</template>
