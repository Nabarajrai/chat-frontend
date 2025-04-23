import { useEffect } from "react";
import { socket } from "../helpers/Socket.helper";

export const useSocket = (setValue) => {
  useEffect(() => {
    console.log("Attempting socket connection...");
    socket.on("connect", () => {
      console.log("✅ Connected to server");
    });
    socket.on("connect_error", (err) => {
      console.error("❌ Connection error:", err.message);
    });
    socket.on("message", (msg) => {
      console.log("Message received", msg);
      setValue(msg);
    });
    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("message");
    };
  }, [setValue]);

  return socket;
};
