import { io } from "socket.io-client";

export const createSocketConnection = () => {
  // For localhost development
  const baseUrl =
    location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://codemate.diy"; // Base URL without /api

  console.log("Creating socket connection to base URL:", baseUrl);

  const socket = io(baseUrl, {
    path: "/api/socket.io", // Specify the correct path
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
