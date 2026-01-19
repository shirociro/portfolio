<template>
  <div class="users-list-view">
    <Loading v-if="isLoading" />
    <transition name="fade-slide" mode="out-in">
      <div
        v-if="users?.rows?.length && !isLoading"
        class="row g-4 align-items-stretch"
      >
        <div
          v-for="user in users?.rows"
          :key="user.id"
          class="col-12 col-sm-6 col-lg-3 user-card"
        >
          <UserItem
            :user="user"
            mode="edit"
            @action="handleEdit(user)"
            @delete="handleDelete(user)"
          />
        </div>
      </div>
    </transition>
    <EmptyState v-if="!isLoading && !users.rows?.length" />
    <Pagination
      v-if="users?.total > limit"
      v-model="page"
      :totalRows="users.total"
      :per-page="limit"
      @update:modelValue="usersStore.setPage(page)"
    />
  </div>
</template>
<script setup>
import { ref, computed, inject } from "vue";
import { useUsersQuery } from "@/modules/users/composables/useUsersQuery";
import EmptyState from "../../../common/components/EmptyState.vue";
import Pagination from "@/common/components/Pagination.vue";
import Loading from "@/common/components/Loading.vue";
import UserItem from "@/modules/users/components/ui/UserItem.vue";

import { useUsersStore } from "@/modules/users/store/usersStore";
const usersStore = useUsersStore();

const page = ref(usersStore.page);
const limit = ref(usersStore.limit);

const { data: users, isLoading } = useUsersQuery(
  page,
  limit,
  computed(() => usersStore.search),
  computed(() => usersStore.position),
);

const openModal = inject("openModal");

function handleEdit(user) {
  openModal?.("Edit", user);
}

function handleDelete(user) {
  openDeleteModal?.(user);
}
</script>
<style>
.user-card {
  min-width: 250px;
}
</style>
