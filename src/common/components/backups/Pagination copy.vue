<!-- <template>
  <b-pagination
    v-model="localPage"
    :total-rows="totalRows"
    :per-page="perPage"
    :first-text="firstText"
    :last-text="lastText"
    :limit="5"
    class="mt-3"
  ></b-pagination>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue'

const props = defineProps({
  totalRows: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    default: 4,
  },
  firstText: {
    type: String,
    default: 'First',
  },
  lastText: {
    type: String,
    default: 'Last',
  },
  currentPage: {
    type: Number,
    default: 1,
  },
})

// Emit to sync currentPage with parent
const emit = defineEmits(['update:currentPage'])
// Local reactive page state
const localPage = ref(props.currentPage)
const router = useRouter()
const route = useRoute()

// Watch and emit changes
watch(localPage, (newPage) => {
  emit('update:currentPage', newPage) // if you want to notify parent
  
})

// Keep local value in sync with parent
watch(
  () => props.currentPage,
  (val) => {
    localPage.value = val
  },
)
</script> -->

<template>
  <b-pagination
    v-model="localPage"
    :total-rows="totalRows"
    :per-page="perPage"
    :first-text="firstText"
    :last-text="lastText"
    :limit="5"
    class="mt-3"
  />
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from "vue";
import { useRouter, useRoute } from "vue-router"; // ✔ REQUIRED

const props = defineProps({
  totalRows: Number,
  perPage: { type: Number, default: 4 },
  firstText: String,
  lastText: String,
  currentPage: { type: Number, default: 1 },
});

const emit = defineEmits(["update:currentPage"]);

const router = useRouter();
const route = useRoute();

const localPage = ref(props.currentPage);

// Update URL when clicking pagination
watch(localPage, (newPage) => {
  emit("update:currentPage", newPage);

  router.replace({
    query: {
      ...route.query,
      page: newPage,
      limit: props.perPage,
    },
  });
});

// Sync from URL → pagination
watch(
  () => route.query.page,
  (page) => {
    if (page) localPage.value = Number(page);
  },
  { immediate: true },
);
</script>
