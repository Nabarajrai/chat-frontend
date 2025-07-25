import { memo, useEffect, useRef, useState } from "react";
//helpers
import { sanitizeHtml } from "../../helpers/SafeHtml.helper";
import { useMessageContext } from "../../context/message/Message.context";
//hooks
import { useUser } from "../../hooks/useUser";
import { useChannelById } from "../../hooks/useChannels";
//react-router
import { useParams } from "react-router-dom";

const MessageComponent = () => {
  const { messages, setMessages } = useMessageContext();
  const [name, setName] = useState("");
  const messageRef = useRef(null);
  const { clientId } = useParams();
  const { getUserById, userDetails, userLoading } = useUser();
  const { getChannelDetails, channelDetails, isLoadingChannel } =
    useChannelById();

  useEffect(() => {
    if (clientId.includes("C")) {
      getChannelDetails(clientId);
      setMessages([]);
    } else {
      getUserById(clientId);
      setMessages([]);
    }
  }, [clientId, getUserById, setMessages, getChannelDetails]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  useEffect(() => {
    if (clientId.includes("C")) {
      setName(channelDetails[0]?.fullName);
    } else {
      setName(userDetails?.fullName);
    }
  }, [clientId, channelDetails, userDetails]);

  return (
    <div className="message-section">
      <div className="message-header">
        {isLoadingChannel || userLoading ? (
          <div className="message-header__title">Loading...</div>
        ) : (
          <h1 className="message-header__title">#{name}</h1>
        )}
      </div>
      <div className="message-lists">
        {messages.map((msg) => {
          return (
            <div className="message-wrapper" key={msg.id} ref={messageRef}>
              <div className="message-user">
                <div className="message-user__avatar">
                  <img
                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                    alt=""
                  />
                </div>
              </div>
              <div className="message-user-container">
                <div className="message-user-name">{msg?.senderFullName}</div>
                <div className="message-body-wrapper">
                  <div className="message-body">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(msg?.message),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(MessageComponent);
