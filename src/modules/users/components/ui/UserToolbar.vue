<template>
  <div
    class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 pb-4 flex-wrap"
  >
    <!-- Title + Add Button -->
    <div class="d-flex align-items-center gap-2 flex-shrink-0">
      <h2 class="m-0">Users</h2>
      <button
        class="btn btn-primary d-flex justify-content-center align-items-center p-2 rounded-circle"
        style="height: 40px; width: 40px"
        @click="$emit('action', 'Add')"
        title="Add User"
      >
        <i class="bi bi-plus-lg fs-4"></i>
      </button>
    </div>

    <!-- Filters & Search -->
    <div
      class="d-flex flex-wrap gap-2 justify-content-end align-items-center flex-grow-1"
    >
      <!-- Position Filter -->
      <div
        class="d-flex align-items-center gap-2 flex-grow-1 flex-md-grow-0 min-w-0"
      >
        <label class="form-label m-0">Position:</label>
        <select
          class="form-select flex-grow-1"
          v-model="usersStore.position"
          @change="usersStore.setPosition(usersStore.position)"
        >
          <option value="all">All</option>
          <option value="1">Frontend</option>
          <option value="2">Backend</option>
          <option value="3">QA</option>
        </select>
      </div>

      <!-- Search -->
      <div
        class="d-flex align-items-center gap-2 flex-grow-1 flex-md-grow-0 min-w-0"
      >
        <input
          type="text"
          v-model="search"
          @input="usersStore.setSearch(search)"
          class="form-control"
          placeholder="Search..."
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUsersStore } from "@/modules/users/store/usersStore";
const usersStore = useUsersStore();

const search = ref(usersStore.search);
const position = ref("all");
</script>
