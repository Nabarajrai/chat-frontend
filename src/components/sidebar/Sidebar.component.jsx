import { useCallback, useState, memo } from "react";
//cions
import { MdHomeFilled } from "react-icons/md";
import { BiSolidMessageAlt } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";

const SidebarComponent = () => {
  const [activeClass, setActiveClass] = useState("home");

  const activeTab = useCallback((type) => {
    setActiveClass(type);
  }, []);

  return (
    <div className="sidebar-container">
      <div className="sidebar-wrapper">
        <div className="sidebar-home">
          <div
            className="sidebar-home__hometab"
            onClick={() => activeTab("home")}>
            <div
              className={`sidebar-home__hometab--icon  ${
                activeClass === "home" && "active"
              }`}>
              <MdHomeFilled />
            </div>
            <div className="sidebar-home__hometab--title">
              <span>Home</span>
            </div>
          </div>
          <div className="sidebar-home__dmtab" onClick={() => activeTab("dm")}>
            <div
              className={`sidebar-home__dmtab--icon ${
                activeClass === "dm" && "active"
              }`}>
              <BiSolidMessageAlt />
            </div>
            <div className="sidebar-home__dmtab--title">
              <span>DMs</span>
            </div>
          </div>
          <div
            className="sidebar-home__notifications"
            onClick={() => activeTab("activity")}>
            <div
              className={`sidebar-home__notifications--icon ${
                activeClass === "activity" && "active"
              }`}>
              <IoIosNotifications />
            </div>
            <div className="sidebar-home__notifications--title">
              <span>Activity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SidebarComponent);
