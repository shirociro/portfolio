import { getUserSocket } from "./index";
import { useUsersStore } from "../store/usersStore";
import { useQueryClient } from "@tanstack/vue-query";

let isInitialized = false;

export function initUserSocket() {
  if (isInitialized) return;
  isInitialized = true;

  const userSocket = getUserSocket();
  const usersStore = useUsersStore();
  const queryClient = useQueryClient();

  userSocket.on("userCreated", (user) => {
    usersStore.glowUser(user.id);
    queryClient.invalidateQueries({ queryKey: ["users"] });
  });

  userSocket.on("userUpdated", (user) => {
    usersStore.glowUser(user.id);
    queryClient.invalidateQueries({ queryKey: ["users"] });
  });

  userSocket.on("userDeleted", (user) => {
    usersStore.fadeOutUser(user.id);
    queryClient.invalidateQueries({ queryKey: ["users"] });
  });
}
