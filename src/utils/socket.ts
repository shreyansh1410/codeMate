import { io } from "socket.io-client";
import { VITE_API_URL } from "./constants";

export const createSocketConnection = () => {
  const baseUrl = new URL(VITE_API_URL, window.location.origin).origin;

  return io(baseUrl, {
    withCredentials: true,
    transports: ["websocket", "polling"],
  });
};
