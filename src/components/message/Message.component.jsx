import { memo } from "react";
//helpers
import { sanitizeHtml } from "../../helpers/SafeHtml.helper";
import { useMessageContext } from "../../context/message/Message.context";
import { useTabsContext } from "../../context/tabs/Tabs.context";

const MessageComponent = () => {
  const { messages } = useMessageContext();
  const { tabName } = useTabsContext();

  return (
    <div className="message-section">
      <div className="message-header">
        <h1># {tabName}</h1>
      </div>
      <div className="message-lists">
        {messages.map((msg) => {
          return (
            <div className="message-wrapper" key={msg.id}>
              <div className="message-user">
                <div className="message-user__avatar">
                  <img
                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                    alt=""
                  />
                </div>
              </div>
              <div className="message-user-container">
                <div className="message-user-name">Nabaraj Rai</div>
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
