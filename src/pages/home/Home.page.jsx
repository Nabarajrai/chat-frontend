import { useCallback, useContext } from "react";

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
import { useParams } from "react-router";
const HomePage = () => {
  const { currentUser } = useContext(UserContext);
  const socket = useSocket(currentUser?.userId);
  const { clientId } = useParams();
  const sendMessageToUser = useCallback(
    (message) => {
      if (currentUser) {
        console.log("Sending message:", message);

        socket.emit("send-message-to-user", {
          senderId: currentUser.userId,
          receiverId: clientId,
          message: message,
          fullName: `${currentUser.firstName} ${currentUser.lastName}`,
        });
      }
    },
    [socket, clientId, currentUser]
  );
  const sendMessageToChannel = useCallback(
    (message) => {
      if (currentUser) {
        console.log("Sending message to channel:", message);
        socket.emit("send-message-to-channel", {
          senderId: currentUser.userId,
          channelId: clientId,
          message: message,
          fullName: `${currentUser.firstName} ${currentUser.lastName}`,
        });
      }
    },
    [currentUser, socket, clientId]
  );

  const combinedFunction = () => {
    if (clientId.includes("D")) {
      return sendMessageToUser;
    } else {
      return sendMessageToChannel;
    }
  };

  return (
    <div className="dashboard-container">
      <HeaderComponent />
      <div className="dashboard-main-section">
        <div className="dashboard-right">
          <SidebarComponent />
        </div>
        <div className="dashboard-left  ">
          <LeftTabsComponent />
          <div className="dashboard-content">
            <MessageComponent />
            <div className="dashboard-footer">
              <TextEditor sendMessage={combinedFunction} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
