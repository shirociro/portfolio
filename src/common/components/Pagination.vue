<template>
  <b-pagination
    v-model="localPage"
    :total-rows="totalRows"
    :per-page="perPage"
    :first-text="firstText"
    :last-text="lastText"
    :limit="perPage"
    class="mt-3"
  />
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";

// --------------------------------------------------
// PROPS
// --------------------------------------------------
const props = defineProps({
  totalRows: { type: Number, required: true },
  perPage: { type: Number, default: 4 },
  currentPage: { type: Number, default: 1 },
  firstText: { type: String, default: "First" },
  lastText: { type: String, default: "Last" },
});

// --------------------------------------------------
// EMITS
// --------------------------------------------------
const emit = defineEmits(["update:currentPage"]);

// --------------------------------------------------
// LOCAL STATE
// --------------------------------------------------
const localPage = ref(props.currentPage);

// --------------------------------------------------
// When user clicks pagination → update parent + URL
// --------------------------------------------------
// watch(localPage, (newPage) => {
//   // notify parent so parent can fetch listUsers() with correct page
//   emit('update:currentPage', newPage)
// })

// --------------------------------------------------
// Sync pagination if URL changes (back/forward browser)
// --------------------------------------------------
</script>
