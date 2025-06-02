import { memo, useState } from "react";
//helpers
import { sanitizeHtml } from "../../helpers/SafeHtml.helper";
import { useMessageContext } from "../../context/message/Message.context";
import { useTabsContext } from "../../context/tabs/Tabs.context";

const MessageComponent = () => {
  const { messages } = useMessageContext();
  const { tabName } = useTabsContext();
  const [array, setArray] = useState([
    {
      id: 1,
      data: [
        { messageId: 1, text: "<p>Message 1</p>", isEdited: true },
        { messageId: 2, text: "<p>Message 2</p>", isEdited: true },
        { messageId: 3, text: "<p>Message 3</p>", isEdited: true },
      ],
      receiverId: 1,
      senderId: 2,
      senderName: "Nabaraj Rai",
    },
    {
      id: 2,
      data: [
        { messageId: 1, text: "<p>Message 1</p>", isEdited: true },
        { messageId: 2, text: "<p>Message 2</p>", isEdited: true },
        { messageId: 3, text: "<p>Message 3</p>", isEdited: true },
      ],
      receiverId: 2,
      senderId: 2,
      senderName: "Saroj Rai",
    },
    {
      id: 3,
      data: [
        { messageId: 1, text: "<p>Message 1</p>", isEdited: true },
        { messageId: 2, text: "<p>Message 2</p>", isEdited: true },
        { messageId: 3, text: "<p>Message 3</p>", isEdited: true },
      ],
      receiverId: 1,
      senderId: 2,
      senderName: "Kamala Rai",
    },
    {
      id: 3,
      data: [
        { messageId: 1, text: "<p>Message 1</p>", isEdited: true },
        { messageId: 2, text: "<p>Message 2</p>", isEdited: true },
        { messageId: 3, text: "<p>Message 3</p>", isEdited: true },
      ],
      receiverId: 1,
      senderId: 2,
      senderName: "Bipana Rai",
    },
    {
      id: 3,
      data: [
        { messageId: 1, text: "<p>Message 1</p>", isEdited: true },
        { messageId: 2, text: "<p>Message 2</p>", isEdited: true },
        { messageId: 3, text: "<p>Message 3</p>", isEdited: true },
      ],
      receiverId: 1,
      senderId: 2,
      senderName: "Sanam Rai",
    },
  ]);
  console.log("tabName", tabName);
  return (
    <div className="message-section">
      <div className="message-header">
        <h1># {tabName}</h1>
      </div>
      <div className="message-lists">
        {array.map((msg) => {
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
                <div className="message-user-name">{msg?.senderName}</div>
                <div className="message-body-wrapper">
                  {msg.data.map((message) => (
                    <div
                      key={message.messageId}
                      className={`message-body ${
                        message.isEdited ? "edited" : ""
                      }`}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHtml(message.text),
                        }}
                      />
                    </div>
                  ))}
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
