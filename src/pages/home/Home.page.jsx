import { useCallback, useContext, useState } from "react";

//component
import HeaderComponent from "../../components/header/Header.component";
import SidebarComponent from "../../components/sidebar/Sidebar.component";
import TextEditor from "../../components/textEditor/TextEditor";
import MessageComponent from "../../components/message/Message.component";
import LeftTabsComponent from "../../components/leftTabs/LeftTabs.component";
//helpers
import { useSocket } from "../../hooks/useSocket";
import { UserContext } from "../../context/User.context";
//contexts
import { useMessageContext } from "../../context/message/Message.context";
const HomePage = () => {
  const [activeTabId, setActiveTabId] = useState(null);
  const { currentUser } = useContext(UserContext);
  const { messages } = useMessageContext();
  console.log("Messages:", messages);
  const socket = useSocket(currentUser?.userId);
  const sendMessageToUser = useCallback(
    (message) => {
      console.log("Sending message:", message);
      if (currentUser && activeTabId) {
        socket.emit("send-message-to-user", {
          senderId: currentUser.userId,
          receiverId: activeTabId,
          message: message,
        });
      }
    },
    [socket, activeTabId, currentUser]
  );

  return (
    <div className="dashboard-container">
      <HeaderComponent />
      <div className="dashboard-main-section">
        <div className="dashboard-right">
          <SidebarComponent />
        </div>
        <div className="dashboard-left  ">
          <LeftTabsComponent setActiveTabId={setActiveTabId} />
          <div className="dashboard-content">
            <MessageComponent />
            <div className="dashboard-footer">
              <TextEditor sendMessage={sendMessageToUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
