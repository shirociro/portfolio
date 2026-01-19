import { useMutation, useQueryClient } from "@tanstack/vue-query";
import * as stackService from "@/modules/stacks/services/stacksService";

export function useStackMutations() {
  const queryClient = useQueryClient();

  const createStack = useMutation({
    mutationFn: stackService.createStack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stacks"] });
    },
  });

  const updateStack = useMutation({
    mutationFn: stackService.updateStack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stacks"] });
    },
  });

  const deleteStack = useMutation({
    mutationFn: stackService.deleteStack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stacks"] });
    },
  });

  return {
    createStack,
    updateStack,
    deleteStack,
  };
}
