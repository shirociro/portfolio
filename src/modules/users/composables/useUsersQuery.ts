import { useQuery } from "@tanstack/vue-query";
import * as userService from "@/modules/users/services/usersService";
import { unref } from "vue";
// import { useUsersStore } from "@/modules/users/store/usersStore";
// const usersStore = useUsersStore();
export function useUsersQuery(
  page: any,
  limit: any,
  search: any,
  position: any,
) {
  return useQuery({
    queryKey: ["users", page, limit, search, position],
    queryFn: () =>
      userService.fetchUsers(
        unref(page),
        unref(limit),
        unref(search),
        unref(position),
      ),
    keepPreviousData: true,
  });
}
