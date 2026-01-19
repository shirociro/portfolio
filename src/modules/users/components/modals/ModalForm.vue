<template>
  <div
    class="modal fade show d-block"
    tabindex="-1"
    role="dialog"
    aria-modal="true"
    style="background-color: rgba(0, 0, 0, 0.5)"
    @keydown.esc="closeModal"
  >
    <div
      class="modal-dialog modal-dialog-centered"
      style="max-width: 400px !important"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ mode }} User</h5>
        </div>

        <div class="modal-body">
          <form @submit.prevent="onSubmit">
            <!-- Top Avatar Upload -->
            <AvatarUpload
              @update="handleAvatarUpload"
              :profile="profile"
              :mode="mode"
            />

            <div class="row gy-2">
              <!-- Firstname -->
              <div class="col-12 d-flex align-items-center">
                <label class="form-label me-2 mb-0">Firstname</label>
                <input
                  v-model="firstname"
                  maxlength="100"
                  class="form-control flex-fill"
                  placeholder=""
                  @keyup="validateField(firstname, firstnameValidity)"
                  :class="{ 'is-invalid': !firstnameValidity }"
                />
              </div>

              <!-- Lastname -->
              <div class="col-12 d-flex align-items-center">
                <label class="form-label me-2 mb-0">Lastname</label>
                <input
                  v-model="lastname"
                  maxlength="100"
                  class="form-control flex-fill"
                  placeholder=""
                  @keyup="validateField(lastname, lastnameValidity)"
                  :class="{ 'is-invalid': !lastnameValidity }"
                />
              </div>

              <!-- Username -->
              <div class="col-12 d-flex align-items-center">
                <label class="form-label me-2 mb-0">Username</label>
                <input
                  v-model="username"
                  maxlength="100"
                  class="form-control flex-fill"
                  placeholder=""
                  @keyup="validateField(username, usernameValidity)"
                  :class="{ 'is-invalid': !usernameValidity }"
                />
              </div>

              <!-- Password -->
              <div
                class="col-12 d-flex align-items-center"
                v-if="mode == 'Add'"
              >
                <label class="form-label me-2 mb-0">Password</label>
                <input
                  v-model="password"
                  type="password"
                  maxlength="100"
                  class="form-control flex-fill"
                  placeholder=""
                  @keyup="validateField(password, passwordValidity)"
                  :class="{ 'is-invalid': !passwordValidity }"
                />
              </div>

              <!-- Position -->
              <div class="col-12 d-flex align-items-center">
                <label class="form-label me-2 mb-0">Position</label>
                <select
                  v-model="position"
                  class="form-select flex-fill"
                  @change="validateField(position, positionValidity)"
                  :class="{ 'is-invalid': !positionValidity }"
                >
                  <option value="">Select Position</option>
                  <option value="1">Frontend</option>
                  <option value="2">Backend</option>
                  <option value="3">QA</option>
                </select>
              </div>

              <!-- Role -->
              <div class="col-12 d-flex align-items-center">
                <label class="form-label me-2 mb-0">Role</label>
                <select
                  v-model="role"
                  class="form-select flex-fill"
                  @change="validateField(role, roleValidity)"
                  :class="{ 'is-invalid': !roleValidity }"
                >
                  <option value="">Select Role</option>
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                </select>
              </div>
            </div>

            <!-- Footer -->
            <div class="modal-footer mt-3">
              <button
                type="button"
                class="btn btn-secondary"
                @click="closeModal"
              >
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import AvatarUpload from "@/common/components/ProfileUpload.vue";

import { useUserMutations } from "@/modules/users/composables/useUserMutation";
import { useUsersStore } from "@/modules/users/store/usersStore";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
const queryClient = useQueryClient();
const props = defineProps<{
  mode: "Add" | "Edit";
  userData: any;
}>();
const emit = defineEmits(["close"]);
const usersStore = useUsersStore();
const { createUser, updateUser } = useUserMutations();
const remove_profile = ref(false);

const firstname = ref("");
const firstnameValidity = ref(true);

const lastname = ref("");
const lastnameValidity = ref(true);

const username = ref("");
const usernameValidity = ref(true);

const password = ref("");
const passwordValidity = ref(true);

const position = ref("");
const positionValidity = ref(true);

const role = ref("");
const roleValidity = ref(true);
const profile = ref<any>();

function onSubmit() {
  const payload = {
    id: props.mode === "Edit" ? props.userData.id : undefined,
    firstname: firstname.value,
    lastname: lastname.value,
    username: username.value,
    password: props.mode === "Add" ? password.value : undefined,
    position_id: position.value,
    role_id: role.value,
    profile: profile.value,
    remove_profile: remove_profile.value,
  };

  if (props.mode === "Edit") {
    updateUser.mutate(payload, {
      onSuccess: (data: any) => {
        closeModal();
        usersStore.glowEffect(payload.id);
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
        }, 1500);
      },
    });
  } else {
    createUser.mutate(payload, {
      onSuccess: (data: any) => {
        closeModal();
      },
    });
  }
}
function validateField(field, validity) {
  validity = !!field || field.length != 0;
}

function closeModal() {
  emit("close");
}

watch(
  () => props.userData,
  (u) => {
    firstname.value = u?.firstname || "";
    lastname.value = u?.lastname || "";
    username.value = u?.username || "";
    position.value = u?.position_id || "";
    role.value = u?.role_id || "";
    profile.value = u?.profile || "";
  },
  { immediate: true },
);

function handleAvatarUpload(file: any) {
  if (!file) {
    profile.value = "";
    remove_profile.value = true;
  } else {
    profile.value = file;
    remove_profile.value = false;
  }
}
</script>

<style scoped>
.form-label {
  width: 90px;
}
.modal-dialog {
  animation: pop 0.3s ease;
}
/* .glow {
  box-shadow: 0 0 10px 3px rgba(255, 215, 0, 0.8);
  transition: box-shadow 0.3s ease;
} */
</style>
