import { useCallback, useState } from "react";
//helpers
import { api, APIS } from "../config/Api.config";
//context
import { useMessageContext } from "../context/message/Message.context";

export const useMessage = () => {
  const { setMessages } = useMessageContext();
  const getMessageByUserId = useCallback(
    async (senderId, receiverId) => {
      try {
        const res = await api(
          `${APIS.getMessageById}?senderId=${senderId}&receiverId=${receiverId}`,
          "GET"
        );

        if (res?.status === "success") {
          setMessages(res?.data);
        } else {
          console.error(res?.message);
        }
        console.log("useMessage hook initialized", res);
      } catch (e) {
        console.error("Error initializing useMessage data fetch:", e);
      }
    },
    [setMessages]
  );
  return {
    getMessageByUserId,
  };
};
