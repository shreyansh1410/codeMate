import { io } from "socket.io-client";
import { VITE_API_URL } from "./constants";

export const createSocketConnection = () => {
  // For development: uses http://localhost:5000 (removes /api)
  // For production: keeps http://3.108.220.117/api intact
  const baseUrl =
    location.hostname === "localhost"
      ? VITE_API_URL.replace(/\/api$/, "")
      : "https:codemate.diy/api";

  console.log("Creating socket connection to base URL:", baseUrl);

  const socket = io(baseUrl, {
    withCredentials: true,
    transports: ["websocket", "polling"],
  });

  socket.on("connect", () => {
    console.log("Socket connected successfully with ID:", socket.id);
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error.message);
  });

  return socket;
};
