<template>
  <div>
    <b-navbar
      class="shadow-sm px-4 py-2 d-flex justify-content-between align-items-center sticky-top bg-white"
    >
      <b-navbar-nav class="ms-auto d-flex align-items-center gap-3">
        <!-- 🔔 Notification Dropdown -->
        <!-- <div class="dropdown">
          <div
            class="position-relative cursor-pointer"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-bell fs-4 text-secondary"></i>
            <span v-if="notificationsStore.notifications.length" class="notif-badge">
              <strong v-if="notificationsStore.notifications.length > 0" class="text-danger">
                {{ notificationsStore.notifications.length }}
              </strong>
            </span>
          </div>
          <NotificationItem />
        </div> -->

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
              :src="
                getAvatarUrl(currentUser.profile) +
                '?v=' +
                new Date(currentUser.updated_at).getTime()
              "
              alt="Profile"
              class="w-100 h-100 object-fit-cover rounded-circle"
            />
            <div v-else class="text-uppercase">
              {{ user.firstname[0] }}
            </div>
          </div>

          <ul class="dropdown-menu dropdown-menu-end shadow-sm mt-2">
            <li class="px-3 py-2 border-bottom text-center">
              <strong>{{ user.firstname + " " + user.lastname }}</strong>
              <div class="small text-muted">{{ user.username }}</div>
            </li>

            <li class="px-3 py-2">
              <div class="d-flex align-items-center justify-content-between">
                <span>Dark Mode</span>
                <div class="form-check form-switch m-0">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="darkSwitch"
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
    <teleport to="body">
      <!-- <transition name="fade" mode="out-in">
        <Alert :message="tasksStore.alertMsg" :type="tasksStore.alertType" />
      </transition> -->
    </teleport>
  </div>
</template>

<script setup>
/* -------------------- Imports -------------------- */
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useDark } from "@vueuse/core";

/* Stores */
import { useAuthStore } from "@/modules/auth/store/authStore";
import { useUsersStore } from "@/modules/users/store/usersStore";
// import { useNotificationsStore } from '@/stores/notifications'

/* Components */
import SubHeader from "@/common/components/SubNavbar.vue";
// import NotificationItem from '@/components/features/notifications/NotificationItem.vue'
import Alert from "@/common/components/Alert.vue";
/* Utils */
import { getAvatarUrl } from "@/common/utils/image";

/* -------------------- Stores & Router -------------------- */
const usersStore = useUsersStore();
// const tasksStore = useTasksStore()

const auth = useAuthStore();
// const notificationsStore = useNotificationsStore()
const router = useRouter();

/* -------------------- User State -------------------- */

const localUser = ref(JSON.parse(localStorage.getItem("user")) || null);
const user = ref(localUser.value || {});

const avatarVersion = ref(Date.now());

const currentUser = computed(() => {
  if (!localUser.value) return null;
  return usersStore.getUserById(localUser.value.id) || localUser.value;
});

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

watch(
  () => user.value.profile,
  () => {
    avatarVersion.value = Date.now(); // triggers new key → remount
  },
);

const handleLogout = async () => {
  auth.logout();
  router.push({ name: "Login" });
};
</script>
