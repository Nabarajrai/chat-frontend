import { useState } from "react";
import PropTypes from "prop-types";
import { MessageContext } from "./Message.context";

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const value = {
    messages,
    setMessages,
  };
  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};
MessageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
