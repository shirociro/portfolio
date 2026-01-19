<template>
  <div
    class="card p-3 mb-3"
    :data-id="user.id"
    :class="
      usersStore.fadingEffectIDs.includes(user.id)
        ? 'fade-out glow-danger'
        : usersStore.glowingEffectIDs.includes(user.id)
          ? 'glow'
          : ''
    "
  >
    <div class="row g-0">
      <div class="d-flex gap-2 justify-content-end">
        <!-- Edit -->
        <button
          @click="$emit('action', user)"
          class="btn btn-sm rounded-circle btn-outline-primary"
        >
          <i class="bi bi-pencil"></i>
        </button>
        <!-- Delete -->
        <button
          @click="handleDelete(user.id)"
          class="btn btn-sm rounded-circle btn-outline-danger"
        >
          <i class="bi bi-trash"></i>
        </button>
      </div>
      <div class="col-md-4">
        <div
          class="mb-2"
          style="
            width: 80px;
            height: 80px;
            border: 3px solid #4caf50;
            border-radius: 50%;
            padding: 2px;
          "
        >
          <img
            v-if="user.profile"
            :src="getAvatarUrl(user.profile)"
            alt="Avatar"
            class="rounded-circle"
            style="width: 100%; height: 100%; object-fit: cover"
            @error="onImgError(user, $event)"
          />
          <i
            v-else
            class="bi bi-person d-flex justify-content-center align-items-center text-secondary"
            style="font-size: 4rem; width: 100%; height: 100%"
          ></i>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ user.firstname }} {{ user.lastname }}</h5>
          <p class="card-text">Position: {{ user.position }}</p>
          <p class="card-text">Role: {{ user.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useUsersStore } from "@/modules/users/store/usersStore";
import * as userService from "@/modules/users/services/usersService";
import { getAvatarUrl } from "@/common/utils/image";

const usersStore = useUsersStore();
const queryClient = useQueryClient();
const props = defineProps({
  user: { type: Object, required: true },
});

function onImgError(user, e) {
  if (user.profile == "") {
    e.target.style.display = "none";
  }
}

const deleteUserMutation = useMutation({
  mutationFn: (id) => userService.deleteUser(id),

  onMutate: (id) => {
    // UI effect before API resolves
    usersStore.fadeEffect(id);
  },

  onSuccess: () => {
    // Refetch users list
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }, 1500);
  },

  onError: (err, id) => {
    // rollback UI if needed
    console.error(err);
  },
});

const handleDelete = (id) => {
  deleteUserMutation.mutate(id);
};
</script>

<style scoped>
/* Expanded card width */
.custom-width {
  width: 400px !important;
  z-index: 9999 !important;
}
</style>
