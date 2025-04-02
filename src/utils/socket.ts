import { io } from "socket.io-client";
import { VITE_API_URL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname == "localhost") {
    return io(VITE_API_URL);
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};
