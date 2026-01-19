<template>
  <div>
    <div
      v-if="usersStore.loading"
      class="d-flex justify-content-center py-5 w-100"
    >
      <div class="text-center">
        <ProgressSpinner
          style="width: 50px; height: 50px"
          strokeWidth="8"
          fill="transparent"
          animationDuration=".5s"
          aria-label="Custom ProgressSpinner"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUsersStore } from "@/modules/users/store/usersStore";

import ProgressSpinner from "primevue/progressspinner";

const usersStore = useUsersStore();
</script>
