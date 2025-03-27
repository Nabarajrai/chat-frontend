import { useCallback, useContext, useMemo, useState } from "react";
import classnames from "classnames";
//context
import { UserContext } from "../../context";
//helpers
import { clearLocalStorage } from "../../helpers/LocatStorage.helper";

//component
import HeaderComponent from "../../components/header/Header.component";
import SidebarComponent from "../../components/sidebar/Sidebar.component";
import ButtonComponent from "../../components/button/Button.component";

//icons
import { FaPlus } from "react-icons/fa";
import { MdNavigateBefore } from "react-icons/md";

const HomePage = () => {
  const [activeClass, setActiveClass] = useState("channels");
  const [showDropdown, setShowDropdown] = useState(false);
  // const { currentUser } = useContext(UserContext);
  // console.log("HomePage");
  // const handleLogOut = useCallback(() => {
  //   clearLocalStorage();
  //   window.location.href = "/";
  // }, []);

  const handleShowActive = useCallback((type) => {
    console.log("handleShowActive", type);
    setActiveClass(type);
  }, []);

  const handleShowDropdown = useCallback(() => {
    setShowDropdown(!showDropdown);
  }, [showDropdown]);

  const showDropdownClass = useMemo(
    () => (showDropdown ? "active" : ""),
    [showDropdown]
  );

  const combineClass = useMemo(
    () => classnames("tabs-lists", showDropdownClass),
    [showDropdownClass]
  );

  console.log("HomePage", combineClass);
  return (
    <div className="dashboard-container">
      <HeaderComponent />
      <div className="dashboard-main-section">
        <div className="dashboard-right">
          <SidebarComponent />
        </div>
        <div className="dashboard-left  ">
          <div className="dashboard-tab">
            <div className="dashboard-tab-lists">
              <div className="dashboard-tabs">
                <div className="dashboard-tabs__room">
                  <ButtonComponent size="lg" varient="primary">
                    <span className="dashboard-tabs__room--title">
                      Meeting Room
                    </span>
                    <span className="dashboard-tabs__room--icon">
                      <FaPlus />
                    </span>
                  </ButtonComponent>
                </div>
                <div className="dashboard-tabs__channel">
                  <div
                    className="dashboard-tabs__channel--tab"
                    onClick={handleShowDropdown}>
                    <span className="icon">
                      <MdNavigateBefore />
                    </span>
                    <span className="title">Channels</span>
                  </div>
                  <div className={`${combineClass}`}>
                    <div
                      className={`dashboard-tabs__channel--lists ${
                        activeClass === "lists" && "active"
                      }`}
                      onClick={() => handleShowActive("lists")}>
                      <span>General</span>
                    </div>
                    <div
                      className={`dashboard-tabs__channel--add ${
                        activeClass === "add" && "active"
                      }`}
                      onClick={() => handleShowActive("add")}>
                      <span>+</span>
                      <span>Add Channels</span>
                    </div>
                  </div>
                </div>
                <div className="dashboard-tabs__tab">Settings</div>
              </div>
            </div>
          </div>
          <div className="dashboard-content">content</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
