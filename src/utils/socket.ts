import {io} from "socket.io-client";
import { VITE_API_URL } from "./constants";

export const createSocketConnection = () => {
    const baseUrl = VITE_API_URL.replace(/\/api$/, '');
    console.log("Creating socket connection to base URL:", baseUrl);
    
    const socket = io(baseUrl, {
        withCredentials: true,
        transports: ['websocket', 'polling']
    });
    
    socket.on("connect", () => {
        console.log("Socket connected successfully with ID:", socket.id);
    });
    
    socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error.message);
    });
    
    return socket;
};