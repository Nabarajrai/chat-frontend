import { useEffect } from "react";
import { socket } from "../helpers/Socket.helper";
import { useMessageContext } from "../context/message/Message.context";

export const useSocket = (userId) => {
  const { setMessages } = useMessageContext();

  useEffect(() => {
    if (!userId) return;
    console.log("🔌 Setting up socket connection for user:", userId);
    // 🔌 Connect manually since autoConnect is false
    if (!socket.connected) {
      console.log("🔌 Connecting socket manually...");
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("✅ Connected to server");
    });
    socket.on("receive-user-message", (message) => {
      console.log("📩 Received message:", message);
      try {
        const parsed =
          typeof message === "string" ? JSON.parse(message) : message;
        setMessages((prev) => [...prev, parsed]);
      } catch (error) {
        console.error("❌ Failed to parse message:", message, error);
      }
    });
    socket.on("connect_error", (err) => {
      console.error("❌ Connection error:", err.message);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("receive-user-message");
    };
  }, [userId, setMessages]);

  return socket;
};
