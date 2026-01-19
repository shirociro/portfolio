<template>
  <div
    class="modal fade show d-block"
    tabindex="-1"
    type="dialog"
    aria-modal="true"
    style="background-color: rgba(0, 0, 0, 0.5)"
    @keydown.esc="closeModal"
  >
    <div
      class="modal-dialog modal-dialog-centered"
      style="max-width: 400px !important"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ mode }} Stack</h5>
        </div>

        <div class="modal-body">
          <form @submit.prevent="onSubmit">
            <AvatarUpload
              @update="handleAvatarUpload"
              :logo="logo"
              :mode="mode"
            />

            <div class="row gy-2">
              <div class="col-12 d-flex align-items-center">
                <label class="form-label me-2 mb-0">Language</label>
                <input
                  v-model="language"
                  maxlength="100"
                  class="form-control flex-fill"
                  placeholder=""
                  @keyup="validateField(language, languageValidity)"
                  :class="{ 'is-invalid': !languageValidity }"
                />
              </div>

              <!-- Type -->
              <div class="col-12 d-flex align-items-center">
                <label class="form-label me-2 mb-0">Type</label>
                <select
                  v-model="types"
                  class="form-select flex-fill"
                  @change="validateField(types, typeValidity)"
                  :class="{ 'is-invalid': !typeValidity }"
                >
                  <option value="">Select type</option>
                  <option value="1">Frontend</option>
                  <option value="2">Backend</option>
                  <option value="2">Testing</option>
                  <option value="2">Devops</option>
                </select>
              </div>
              <div class="col-12 d-flex">
                <label class="form-label me-2 mb-0">Concepts</label>
                <Editor
                  style="width: 100%"
                  v-model="concepts"
                  :customClass="{ 'is-invalid': !conceptsValidity }"
                />
              </div>
            </div>

            <!-- Footer -->
            <div class="modal-footer mt-3">
              <button
                type="button"
                class="btn btn-secondary"
                @click="closeModal"
              >
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import AvatarUpload from "@/common/components/logoUpload.vue";
import Editor from "@/common/components/Editor.vue";

import { useStackMutations } from "@/modules/stacks/composables/useStackMutation";
import { useStacksStore } from "@/modules/stacks/store/stacksStore";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { stat } from "fs";
const queryClient = useQueryClient();
const props = defineProps<{
  mode: "Add" | "Edit";
  stackData: any;
}>();
const emit = defineEmits(["close"]);
const stacksStore = useStacksStore();
const { createStack, updateStack } = useStackMutations();
const remove_logo = ref(false);

const language = ref("");
const languageValidity = ref(true);

const concepts = ref("");
const conceptsValidity = ref(true);

const types = ref("");
const typeValidity = ref(true);
const logo = ref<any>();

function onSubmit() {
  const payload = {
    id: props.mode === "Edit" ? props.stackData.id : undefined,
    language: language.value,
    concepts: concepts.value,
    type_id: types.value,
    logo: logo.value,
    remove_logo: remove_logo.value,
  };

  if (props.mode === "Edit") {
    updateStack.mutate(payload, {
      onSuccess: (data: any) => {
        closeModal();
        stacksStore.glowEffect(payload.id);
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ["stacks"] });
        }, 1500);
      },
    });
  } else {
    createStack.mutate(payload, {
      onSuccess: (data: any) => {
        closeModal();
      },
    });
  }
}
function validateField(field, validity) {
  validity = !!field || field.length != 0;
}

function closeModal() {
  emit("close");
}

watch(
  () => props.stackData,
  (u) => {
    language.value = u?.language || "";
    concepts.value = u?.concepts || "";
    types.value = u?.types || "";
    logo.value = u?.logo || "";
  },
  { immediate: true },
);

function handleAvatarUpload(file: any) {
  if (!file) {
    logo.value = "";
    remove_logo.value = true;
  } else {
    logo.value = file;
    remove_logo.value = false;
  }
}
</script>

<style scoped>
.form-label {
  width: 90px;
}
.modal-dialog {
  animation: pop 0.3s ease;
}
</style>
