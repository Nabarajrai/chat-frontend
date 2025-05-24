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

const HomePage = () => {
  const { currentUser } = useContext(UserContext);
  const socket = useSocket(currentUser?.userId);
  const sendMessage = useCallback(
    (content) => {
      socket.emit("message", content);
    },
    [socket]
  );

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
              <TextEditor sendMessage={sendMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
