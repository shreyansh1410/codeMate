import { io } from "socket.io-client";

export const createSocketConnection = () => {
  // For localhost development
  const baseUrl =
    location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://codemate.diy/api"; // Relative path for production

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
