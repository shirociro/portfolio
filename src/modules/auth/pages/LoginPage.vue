<template>
  <div class="container-fluid vh-100 d-flex p-0">
    <div
      class="col-md-6 d-flex flex-column justify-content-center align-items-center bg-primary text-white p-5"
    >
      <div class="text-center mb-5">
        <h2 class="fw-bold">Manage your Tasks</h2>
      </div>
      <!-- LOGIN FORM -->
      <form @submit.prevent="onLogin" class="w-75">
        <!-- USERNAME -->
        <div class="mb-4 input-line">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter username"
            required
          />
        </div>

        <!-- PASSWORD -->
        <div class="mb-4 input-line">
          <label for="password">Password</label>
          <div class="d-flex align-items-center">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              @click="togglePassword"
              class="btn btn-sm btn-outline-light ms-2"
            >
              {{ showPassword ? "Hide" : "Show" }}
            </button>
          </div>
        </div>

        <!-- REMEMBER + FORGOT -->
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="rememberMe"
              id="rememberMe"
            />
            <label class="form-check-label" for="rememberMe">
              Keep me logged in for 30 days
            </label>
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-light w-100"
          :disabled="auth.loading"
        >
          {{ auth.loading ? "Logging in..." : "Login" }}
        </button>

        <p v-if="auth.error" class="text-warning mt-3">{{ auth.error }}</p>
      </form>
    </div>

    <div
      class="col-md-6 d-flex flex-column justify-content-center align-items-center bg-light p-5"
    >
      <div class="text-center text-muted">
        <h4>Welcome back!</h4>
        <p>Log in to continue managing your tasks efficiently.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { useAuthStore } from "@/modules/auth/store/authStore";
import { useUsersStore } from "@/modules/users/store/usersStore";

const username = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);

const auth = useAuthStore();
const usersStore = useUsersStore();
const router = useRouter();
const route = useRoute();

function togglePassword() {
  showPassword.value = !showPassword.value;
}

async function onLogin() {
  const ok = await auth.login(username.value, password.value);
  if (ok) {
    // await usersStore.getUsers()
    const redirect = route.query.redirect || { name: "Users" };
    router.push(redirect);
  }
}
</script>

<style scoped>
.container-fluid {
  overflow: hidden;
}

.bg-primary {
  background-color: #0072c6 !important;
}

.input-line {
  position: relative;
  margin-bottom: 1.5rem;
}

.input-line label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.3rem;
}

.input-line input {
  width: 100%;
  padding: 0.25rem 0;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

.input-line input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.input-line input:focus {
  border-bottom-color: #fff;
}
</style>
