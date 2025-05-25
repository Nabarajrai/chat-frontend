import { memo } from "react";
//helpers
import { sanitizeHtml } from "../../helpers/SafeHtml.helper";
import { useMessageContext } from "../../context/message/Message.context";
import { useTabsContext } from "../../context/tabs/Tabs.context";

const MessageComponent = () => {
  const { messages } = useMessageContext();
  const { tabName } = useTabsContext();
  console.log("tabName", tabName);
  return (
    <div className="content-section">
      <div className="dashboard-header">
        <h1># {tabName}</h1>
      </div>
      <div className="dashboard-body-content">
        <div className="dashboard-body">
          <div className="dashboard-body__message--user">
            <div className="dashboard-body__message--avatar">
              <img
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                alt=""
              />
            </div>
            <div className="dashboard-body__message--name">
              <span>John Doe</span>
            </div>
          </div>
          <div className="dashboard-body__message--content">
            {messages.map((msg) => {
              return (
                <div key={msg?.id}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(msg?.data),
                    }}
                  />
                </div>
              );
            })}
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
              voluptatem.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
              voluptatem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MessageComponent);
