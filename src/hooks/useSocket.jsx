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
      socket.emit("join-user", userId); // ✅ THIS IS MISSING
    });
    socket.on("receive-user-message", (message) => {
      try {
        const parsed =
          typeof message === "string" ? JSON.parse(message) : message;

        // 🛠 Fix: Coerce all IDs to string for consistent comparison
        const receiverId = String(parsed.receiverId);
        const senderId = String(parsed.senderId);
        const currentUserId = String(userId);

        if (receiverId === currentUserId || senderId === currentUserId) {
          setMessages((prev) => [...prev, parsed]);
        } else {
          console.warn("⚠️ Ignored message not meant for this user:", parsed);
        }
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
