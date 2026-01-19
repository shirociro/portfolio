import { io, Socket } from "socket.io-client";

const backendHost =
  window.location.hostname === "localhost"
    ? "localhost"
    : window.location.hostname;

let stackSocket: Socket | null = null;

export function getStackSocket(): Socket {
  if (!stackSocket) {
    stackSocket = io(`http://${backendHost}:3000`, {
      transports: ["websocket"],
      autoConnect: true,
    });

    stackSocket.on("connect", () => {
      console.log("Stack socket connected:", stackSocket!.id);
    });

    stackSocket.on("disconnect", (reason) => {
      console.warn("Stack socket disconnected:", reason);
    });
  }

  return stackSocket;
}
