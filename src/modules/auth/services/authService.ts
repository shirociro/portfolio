import * as authEndpoint from "@/modules/auth/api/auth";

export function login(username, password) {
  return authEndpoint.loginEndpoint(username, password);
}

export function refreshAccessToken(token) {
  return authEndpoint.refreshTokenEndpoint(token);
}
