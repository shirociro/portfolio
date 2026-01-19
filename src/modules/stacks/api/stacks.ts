import { api, apiForm } from "@/common/api/index";
import type { Stack, ListStacksResponse } from "../types"; // import types

export function createStack(stack: Stack) {
  return apiForm.post<Stack>("/stacks", stack);
}

export function updateStack(id: number, stack: Partial<Stack>) {
  return apiForm.patch<Stack>(`/stacks/${id}`, stack);
}

export function deleteStack(id: number) {
  return api.delete<{ message: string }>(`/stacks/${id}`);
}

// frontend API (calls the backend)
export function fetchStacks(
  page: number,
  limit: number,
  search?: string,
  types?: string | number,
) {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", String(limit));
  console.log(search);
  if (search) params.append("search", search);
  if (types !== "all") params.append("type", String(types));

  return api.get<ListStacksResponse>(`/stacks?${params.toString()}`);
}
