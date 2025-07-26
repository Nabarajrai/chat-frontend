import { useCallback, useState } from "react";
//helpers
import { api, APIS } from "../config/Api.config";
//context
import { useMessageContext } from "../context/message/Message.context";

export const useMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setMessages } = useMessageContext();
  const getMessageByUserId = useCallback(
    async (senderId, receiverId) => {
      setIsLoading(true);
      try {
        const res = await api(
          `${APIS.getMessageById}?senderId=${senderId}&receiverId=${receiverId}`,
          "GET"
        );

        if (res?.status === "success") {
          console.log("Messages fetched successfully:", res.data);
          setMessages(res?.data);
          setIsLoading(false);
        } else {
          console.error(res?.message);
          setIsLoading(false);
        }
      } catch (e) {
        console.error("Error initializing useMessage data fetch:", e);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    },
    [setMessages]
  );
  return {
    getMessageByUserId,
    isLoading,
  };
};

export const useMessageByChannelId = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setMessages } = useMessageContext();
  const getMessageByChannelId = useCallback(
    async (channelId) => {
      setIsLoading(true);
      try {
        const res = await api(
          `${APIS.getMessageByChannelId}?channelId=${channelId}`,
          "GET"
        );

        if (res?.status === "success") {
          console.log("Messages by channel fetched successfully:", res.data);
          setMessages(res?.data);
          setIsLoading(false);
        } else {
          console.error(res?.message);
          setIsLoading(false);
        }
      } catch (e) {
        console.error(
          "Error initializing useMessageByChannelId data fetch:",
          e
        );
        setIsLoading(false);
      }
    },
    [setMessages]
  );
  return {
    getMessageByChannelId,
    isLoading,
  };
};
