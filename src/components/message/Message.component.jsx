import { memo, useEffect, useRef } from "react";
//helpers
import { sanitizeHtml } from "../../helpers/SafeHtml.helper";
import { useMessageContext } from "../../context/message/Message.context";
import { useTabsContext } from "../../context/tabs/Tabs.context";
//hooks
import { useUser } from "../../hooks/useUser";
//react-router
import { useParams } from "react-router-dom";

const MessageComponent = () => {
  const { messages } = useMessageContext();
  const { tabName } = useTabsContext();
  const messageRef = useRef(null);
  const { clientId } = useParams();
  const { getUserById, userDetails } = useUser();
  const fullName = `${userDetails?.firstName} ${userDetails?.lastName} `;

  useEffect(() => {
    getUserById(clientId);
  }, [clientId, getUserById]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="message-section">
      <div className="message-header">{fullName && <h1># {fullName} </h1>}</div>
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
                <div className="message-user-name">{msg?.fullName}</div>
                <div className="message-body-wrapper">
                  <div className="message-body">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(msg?.data),
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
