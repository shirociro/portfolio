<template>
  <div>
    <b-navbar
      class="shadow-sm px-4 py-2 d-flex justify-content-between align-items-center sticky-top bg-white"
    >
      <b-navbar-nav class="ms-auto d-flex align-items-center gap-3">
        <!-- 👤 Profile Avatar Dropdown -->
        <div v-if="user" class="dropdown">
          <div
            class="d-flex align-items-center justify-content-center rounded-circle bg-secondary text-white fw-semibold overflow-hidden"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style="width: 42px; height: 42px; cursor: pointer"
          >
            <img
              v-if="user.profile"
              :src="avatarUrl"
              alt="Profile"
              class="w-100 h-100 object-fit-cover rounded-circle"
            />
            <div v-else class="text-uppercase">
              {{ user.firstname?.[0] }}
            </div>
          </div>

          <ul class="dropdown-menu dropdown-menu-end shadow-sm mt-2">
            <li class="px-3 py-2 border-bottom text-center">
              <strong>{{ user.firstname }} {{ user.lastname }}</strong>
              <div class="small text-muted">{{ user.username }}</div>
            </li>

            <li class="px-3 py-2">
              <div class="d-flex align-items-center justify-content-between">
                <span>Dark Mode</span>
                <div class="form-check form-switch m-0">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="isDark"
                  />
                </div>
              </div>
            </li>

            <li><hr class="dropdown-divider" /></li>

            <li>
              <button
                class="dropdown-item text-danger fw-semibold"
                @click="handleLogout"
              >
                <i class="bi bi-box-arrow-right me-2"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </b-navbar-nav>
    </b-navbar>

    <SubHeader />
  </div>
</template>
<script setup>
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useDark } from "@vueuse/core";

import { useAuthStore } from "@/modules/auth/store/authStore";
import SubHeader from "@/common/components/SubNavbar.vue";
import { getAvatarUrl } from "@/common/utils/image";

const auth = useAuthStore();
const router = useRouter();

/**
 * ✅ Single source of truth
 */
const user = computed(() => auth.user);

/**
 * 🔄 Force avatar refresh on profile update
 */
const avatarVersion = ref(Date.now());

const avatarUrl = computed(() => {
  if (!user.value?.profile) return null;
  return getAvatarUrl(user.value.profile) + "?v=" + avatarVersion.value;
});

watch(
  () => user.value?.profile,
  () => {
    avatarVersion.value = Date.now();
  },
);

/**
 * 🌙 Dark mode
 */
const isDark = useDark({
  selector: "html",
  attribute: "data-bs-theme",
  valueDark: "dark",
  valueLight: "light",
  storageKey: "theme",
  onChanged: (dark) => {
    document.documentElement.setAttribute(
      "data-bs-theme",
      dark ? "dark" : "light",
    );
  },
});

/**
 * 🔓 Logout
 */
const handleLogout = () => {
  auth.logout();
  router.push({ name: "Login" });
};
</script>
