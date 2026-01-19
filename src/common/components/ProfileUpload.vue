<template>
  <div
    class="text-center mt-3 mb-3 position-relative"
    style="width: 100px; margin: 0 auto"
  >
    <!-- Hidden PrimeVue FileUpload -->
    <FileUpload
      ref="fileUpload"
      mode="basic"
      accept="image/*"
      :customUpload="true"
      chooseLabel=""
      @select="onAvatarSelect"
      class="d-none"
    />
    <!-- Show preview if selected -->
    <img
      v-if="avatarPreview || profile"
      :src="
        mode == 'Edit' && !avatarPreview ? getAvatarUrl(profile) : avatarPreview
      "
      alt="Profile Avatar"
      class="rounded-circle border avatar-img"
      @click="openFileDialog"
    />
    <i
      v-if="avatarPreview || profile"
      @click="removePhoto()"
      class="bi bi-trash-fill text-danger position-absolute"
      style="
        top: 65%;
        right: 0px;
        cursor: pointer;
        background-color: white;
        border-radius: 30%;
        font-size: 1.2rem;
        padding: 4px;
      "
    >
    </i>
    <!-- Default Bootstrap icon if no preview -->
    <div
      v-else
      class="rounded-circle border avatar-img d-flex align-items-center justify-content-center bg-light text-secondary"
      @click="openFileDialog"
    >
      <i class="bi bi-person" style="font-size: 4rem"></i>
    </div>
  </div>
</template>

<script setup>
/* -------------------- Imports -------------------- */
import { ref, defineEmits, defineProps } from "vue";
import FileUpload from "primevue/fileupload";
import { getAvatarUrl } from "@/common/utils/image";

/* -------------------- Props -------------------- */
const props = defineProps({
  profile: { type: String, required: false },
  mode: { type: String, required: false },
});

/* -------------------- Refs -------------------- */
const fileUpload = ref(null);
const avatarPreview = ref(""); // Preview URL for selected avatar

/* -------------------- Emits -------------------- */
const emit = defineEmits(["update"]);

/* -------------------- Methods -------------------- */

// Open file dialog programmatically
const openFileDialog = () => {
  fileUpload.value?.choose();
};

// Handle file selection
const onAvatarSelect = (event) => {
  const file = event.files?.[0];
  if (!file) return;

  // Show preview in the circle
  avatarPreview.value = URL.createObjectURL(file);

  // Emit file to parent component for upload
  emit("update", file);
};
const removePhoto = (event) => {
  const file = null;

  // Show preview in the circle
  avatarPreview.value = null;

  // Emit file to parent component for upload
  emit("update", file);
};
</script>

<style scoped>
.avatar-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid #dee2e6;
  border-radius: 50%;
}

.p-fileupload {
  display: none !important;
}
</style>
