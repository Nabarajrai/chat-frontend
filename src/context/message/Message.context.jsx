import { useContext, createContext } from "react";

export const MessageContext = createContext({
  messages: [],
  setMessages: () => {},
});

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context;
};
