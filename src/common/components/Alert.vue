<template>
  <div
    v-if="message != ''"
    id="notif-alert"
    class="card flex justify-center gap-4"
    style="min-width: 250px; max-width: 350px; z-index: 99999999999"
  >
    <Message :severity="type" icon="pi pi-send" class="w-80">
      {{ message }}
    </Message>
  </div>
</template>

<script setup>
import Message from "primevue/message";
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
</script>
<style scoped>
#notif-alert {
  top: 65px;
  position: absolute;
  right: 0;
}
</style>
