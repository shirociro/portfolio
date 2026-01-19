import { getStackSocket } from "./index";
import { useStacksStore } from "../store/stacksStore";
import { useQueryClient } from "@tanstack/vue-query";

let isInitialized = false;

export function initStackSocket() {
  if (isInitialized) return;
  isInitialized = true;

  const stackSocket = getStackSocket();
  const stacksStore = useStacksStore();
  const queryClient = useQueryClient();

  stackSocket.on("stackCreated", (stack) => {
    stacksStore.glowUser(stack.id);
    queryClient.invalidateQueries({ queryKey: ["stacks"] });
  });

  stackSocket.on("stackUpdated", (stack) => {
    stacksStore.glowUser(stack.id);
    queryClient.invalidateQueries({ queryKey: ["stacks"] });
  });

  stackSocket.on("stackDeleted", (stack) => {
    stacksStore.fadeOutUser(stack.id);
    queryClient.invalidateQueries({ queryKey: ["stacks"] });
  });
}
