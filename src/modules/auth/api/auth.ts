import { api } from "@/common/api/index";

export function loginEndpoint(username, password) {
  return api.post("/auth/login", { username, password });
}

export function refreshTokenEndpoint(token) {
  return api.post("/users/refresh", { token });
}
