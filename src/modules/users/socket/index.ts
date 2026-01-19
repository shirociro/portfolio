import { io, Socket } from "socket.io-client";

const backendHost =
  window.location.hostname === "localhost"
    ? "localhost"
    : window.location.hostname;

let userSocket: Socket | null = null;

export function getUserSocket(): Socket {
  if (!userSocket) {
    userSocket = io(`http://${backendHost}:3000`, {
      transports: ["websocket"],
      autoConnect: true,
    });

    userSocket.on("connect", () => {
      console.log("🟢 User socket connected:", userSocket!.id);
    });

    userSocket.on("disconnect", (reason) => {
      console.warn("🔴 User socket disconnected:", reason);
    });
  }

  return userSocket;
}
