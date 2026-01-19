import { defineStore } from "pinia";
import * as authService from "@/modules/auth/services/authService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    accessToken: localStorage.getItem("accessToken") || "",
    refreshToken: localStorage.getItem("refreshToken") || "",
    loading: false,
  }),

  actions: {
    async login(username, password) {
      this.loading = true;
      try {
        const response = await authService.login(username, password);
        const { accessToken, refreshToken, user } = response.data.data;

        this.user = user;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        return true;
      } catch (err) {
        console.error("Login failed:", err);
        return false;
      } finally {
        this.loading = false;
      }
    },

    async refreshAccessToken() {
      this.loading = true;
      try {
        const { response } = await authService.refreshAccessToken(
          this.refreshToken,
        );
        this.accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", response.data.accessToken);
      } catch (err) {
        console.error(
          "Token refresh failed:",
          err.response?.data || err.message,
        );
        this.logout();
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.accessToken = "";
      this.refreshToken = "";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },
});
