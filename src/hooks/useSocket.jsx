import { useEffect } from "react";
import { socket } from "../helpers/Socket.helper";
import { useMessageContext } from "../context/message/Message.context";
import { useParams } from "react-router";

export const useSocket = (userId) => {
  const { setMessages } = useMessageContext();
  const { clientId } = useParams();

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
      console.log("testing user id");
      try {
        const parsed =
          typeof message === "string" ? JSON.parse(message) : message;
        const receiverId = String(parsed.receiverId);
        const senderId = String(parsed.senderId);
        const currentUserId = String(userId);
        const currentChannelId = String(clientId);

        if (!receiverId || !senderId) {
          console.warn("🚫 Missing IDs in message:", parsed);
          return;
        }

        if (currentChannelId.startsWith("C")) {
          console.log("💬 Skipping DM messages in this handler");
          return;
        }
        const isIncomingOrOutgoing =
          (receiverId === currentChannelId && senderId === currentUserId) ||
          (senderId === currentChannelId && receiverId === currentUserId);

        if (isIncomingOrOutgoing) {
          setMessages((prev) => [...prev, parsed]);
        } else {
          console.warn("⚠️ Ignored irrelevant message:", parsed);
        }
      } catch (error) {
        console.error("❌ Failed to parse message:", message, error);
      }
    });

    socket.on("receive-message-to-channel", (message) => {
      try {
        const parsed =
          typeof message === "string" ? JSON.parse(message) : message;
        const channelId = String(parsed.channelId);
        const currentChannelId = String(clientId);

        if (channelId === currentChannelId) {
          setMessages((prev) => [...prev, parsed]);
        } else {
          console.warn("⚠️ Ignored message not meant for this channel:");
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
      socket.off("receive-message-to-channel");
    };
  }, [userId, setMessages, clientId]);

  return socket;
};
