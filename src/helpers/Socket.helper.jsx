import { io } from "socket.io-client";

export const socket = io("http://localhost:8080", {
  withCredentials: true,
  transports: ["websocket"],
  autoConnect: false,
});
