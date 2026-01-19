<template>
  <div
    class="card p-3 mb-3"
    :data-id="stack.id"
    :class="
      stacksStore.fadingEffectIDs.includes(stack.id)
        ? 'fade-out glow-danger'
        : stacksStore.glowingEffectIDs.includes(stack.id)
          ? 'glow'
          : ''
    "
  >
    <div class="row g-0">
      <div class="d-flex gap-2 justify-content-end">
        <!-- Edit -->
        <button
          @click="$emit('action', stack)"
          class="btn btn-sm rounded-circle btn-outline-primary"
        >
          <i class="bi bi-pencil"></i>
        </button>
        <!-- Delete -->
        <button
          @click="handleDelete(stack.id)"
          class="btn btn-sm rounded-circle btn-outline-danger"
        >
          <i class="bi bi-trash"></i>
        </button>
      </div>
      <div class="col-md-12 justify-content-center d-flex">
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
            v-if="stack.logo"
            :src="getAvatarUrl(stack.logo)"
            alt="Avatar"
            class="rounded-circle"
            style="width: 100%; height: 100%; object-fit: cover"
            @error="onImgError(stack, $event)"
          />
          <i
            v-else
            class="bi bi-person d-flex justify-content-center align-items-center text-secondary"
            style="font-size: 4rem; width: 100%; height: 100%"
          ></i>
        </div>
      </div>
      <div class="col-md-12">
        <div key="normal">
          <h5 class="card-title">{{ stack.language }}</h5>
          <hr />
          <ScrollPanel style="width: 100%; height: 250px">
            <div
              ref="textBox"
              :style="{
                transition: 'max-height 0.3s ease',
              }"
              class="card-text mt-3"
              v-html="stack.concepts"
            ></div>
          </ScrollPanel>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useStacksStore } from "@/modules/stacks/store/stacksStore";
import * as stackService from "@/modules/stacks/services/stacksService";
import { getAvatarUrl } from "@/common/utils/image";
import ScrollPanel from "primevue/scrollpanel";

const stacksStore = useStacksStore();
const queryClient = useQueryClient();
const props = defineProps({
  stack: { type: Object, required: true },
});

function onImgError(stack, e) {
  if (stack.logo == "") {
    e.target.style.display = "none";
  }
}

const deleteStackMutation = useMutation({
  mutationFn: (id) => stackService.deleteUser(id),

  onMutate: (id) => {
    stacksStore.fadeEffect(id);
  },

  onSuccess: () => {
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["stacks"] });
    }, 1500);
  },

  onError: (err, id) => {
    console.error(err);
  },
});

const handleDelete = (id) => {
  deleteUserMutation.mutate(id);
};
</script>

<style scoped>
.custom-width {
  width: 400px !important;
  z-index: 9999 !important;
}
</style>
