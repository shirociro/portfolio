<template>
  <div class="stacks-list-view">
    <Loading v-if="isLoading" />
    <transition name="fade-slide" mode="out-in">
      <div
        v-if="stacks?.rows?.length && !isLoading"
        class="row g-4 align-items-stretch"
      >
        <div
          v-for="stack in stacks?.rows"
          :key="stack.id"
          class="col-12 col-sm-6 col-lg-4 stack-card"
        >
          <StackItem
            :stack="stack"
            mode="edit"
            @action="handleEdit(stack)"
            @delete="handleDelete(stack)"
          />
        </div>
      </div>
    </transition>
    <EmptyState v-if="!isLoading && !stacks.rows?.length" />
    <Pagination
      v-if="stacks?.total > limit"
      v-model="page"
      :totalRows="stacks.total"
      :per-page="limit"
      @update:modelValue="stacksStore.setPage(page)"
    />
  </div>
</template>
<script setup>
import { ref, computed, inject } from "vue";
import { useStacksQuery } from "@/modules/stacks/composables/useStacksQuery";
import EmptyState from "../../../common/components/EmptyState.vue";
import Pagination from "@/common/components/Pagination.vue";
import Loading from "@/common/components/Loading.vue";
import StackItem from "@/modules/stacks/components/ui/StackItem.vue";

import { useStacksStore } from "@/modules/stacks/store/stacksStore";
const stacksStore = useStacksStore();

const page = ref(stacksStore.page);
const limit = ref(stacksStore.limit);

const { data: stacks, isLoading } = useStacksQuery(
  page,
  limit,
  computed(() => stacksStore.search),
  computed(() => stacksStore.types),
);

const openModal = inject("openModal");

function handleEdit(stack) {
  openModal?.("Edit", stack);
}

function handleDelete(stack) {
  openDeleteModal?.(stack);
}
</script>
<style>
.stack-card {
  min-width: 250px;
}
</style>
