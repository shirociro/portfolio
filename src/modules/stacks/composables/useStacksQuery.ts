import { useQuery } from "@tanstack/vue-query";
import * as stackService from "@/modules/stacks/services/stacksService";
import { unref } from "vue";
export function useStacksQuery(page: any, limit: any, search: any, types: any) {
  return useQuery({
    queryKey: ["stacks", page, limit, search, types],
    queryFn: () =>
      stackService.fetchStacks(
        unref(page),
        unref(limit),
        unref(search),
        unref(types),
      ),
    keepPreviousData: true,
  });
}
