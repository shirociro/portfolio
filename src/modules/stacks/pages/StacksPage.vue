<template>
  <div class="stacks-layout d-flex">
    <div class="flex-grow-1 d-flex flex-column">
      <Header />

      <main class="p-4 flex-grow-1">
        <StackToolbar @action="openFormModal()" />
        <List />
      </main>
    </div>

    <teleport to="body">
      <transition name="fade" mode="out-in">
        <ModalForm
          v-if="isFormModalOpen"
          :stackData="modalData"
          :mode="modalMode"
          @close="closeFormModal"
        />
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref, provide, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

import Header from "@/common/components/Navbar.vue";
import StackToolbar from "@/modules/stacks/components/ui/StackToolbar.vue";
import List from "@/modules/stacks/pages/StacksList.vue";
import ModalForm from "@/modules/stacks/components/modals/ModalForm.vue";

const modalData = ref(null);
const modalMode = ref("Add");
const isFormModalOpen = ref(false);

function openFormModal(mode = "Add", data = {}) {
  modalMode.value = mode === "Edit" ? "Edit" : "Add";
  modalData.value = mode === "Edit" ? data : {};
  isFormModalOpen.value = true;
}

function closeFormModal() {
  isFormModalOpen.value = false;
  modalData.value = null;
}

provide("openModal", openFormModal);

const route = useRoute();
watch(
  () => route.fullPath,
  () => {
    closeFormModal();
  },
);

// ---------- Module-level socket ----------
import { initStackSocket } from "@/modules/stacks/socket/bootstrap";

onMounted(() => {
  initStackSocket(); // initialize socket when this page loads
});
</script>

<style scoped>
.stacks-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
