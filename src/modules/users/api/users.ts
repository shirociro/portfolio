import { api, apiForm } from "@/common/api/index";
import type { User, ListUsersResponse } from "../types"; // import types

export function createUser(user: User) {
  return apiForm.post<User>("/users", user);
}

export function updateUser(id: number, user: Partial<User>) {
  return apiForm.patch<User>(`/users/${id}`, user);
}

export function deleteUser(id: number) {
  return api.delete<{ message: string }>(`/users/${id}`);
}

// frontend API (calls the backend)
export function fetchUsers(
  page: number,
  limit: number,
  search?: string,
  position?: string | number,
) {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", String(limit));
  console.log(search);
  if (search) params.append("search", search);
  if (position !== "all") params.append("position", String(position));

  return api.get<ListUsersResponse>(`/users?${params.toString()}`);
}
