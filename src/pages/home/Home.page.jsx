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
import { FaHashtag } from "react-icons/fa6";

//hooks
import { useDropdown } from "../../hooks/useDropdown";
import { useClassName } from "../../hooks/useActiveClass";

const HomePage = () => {
  const [activeClass, setActiveClass] = useState("channels");
  const [showDropdownDm, setShowDropdownDm] = useState();
  const { showDropdown, toggle } = useDropdown();
  const { activeClassName, combinedClassName } = useClassName();

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

  // const showDropdownClass = useMemo(
  //   () => (showDropdown ? "active" : ""),
  //   [showDropdown]
  // );

  const activeClassNames = useMemo(() => {
    return activeClassName(showDropdown, "active");
  }, [showDropdown, activeClassName]);

  const combineClass = combinedClassName("tabs-lists", activeClassNames);

  const rotateClass = useMemo(() => {
    return classnames("icon", showDropdown ? "active" : "");
  }, [showDropdown]);

  const combineActiveClass = useMemo(
    () => combinedClassName("dashboard-tabs__channel--tab", rotateClass),
    [rotateClass, combinedClassName]
  );

  const handleDm = useCallback(() => {
    setShowDropdownDm((prev) => !prev);
  }, []);

  const activeClassNameDM = activeClassName(showDropdownDm, "active");

  const combineClassDM = combinedClassName(
    "dashboard-tabs-dm-dropdown",
    activeClassNameDM
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
                  <div className={combineActiveClass} onClick={toggle}>
                    <span className="icon">
                      <MdNavigateBefore />
                    </span>
                    <span className="title">Channels</span>
                  </div>
                  <div className={combineClass}>
                    <div
                      className={`dashboard-tabs__channel--lists ${
                        activeClass === "lists" && "active"
                      }`}
                      onClick={() => handleShowActive("lists")}>
                      <span>
                        <FaHashtag />
                      </span>
                      <span>General</span>
                    </div>
                    <div
                      className={`dashboard-tabs__channel--add ${
                        activeClass === "add" && "active"
                      }`}
                      onClick={() => handleShowActive("add")}>
                      <span>
                        <FaPlus />
                      </span>
                      <span>Add Channels</span>
                    </div>
                  </div>
                </div>
                <div className="dashboard-tabs-dm">
                  <div className="dashboard-tabs-dm-title" onClick={handleDm}>
                    <span>
                      <MdNavigateBefore />
                    </span>
                    <span>Direct Messages</span>
                  </div>
                  <div className={combineClassDM}>
                    <div className="dashboard-tabs-dm-details">
                      <div
                        className={`dashboard-tabs-user ${
                          activeClass === "user" && "active"
                        }`}
                        onClick={() => handleShowActive("user")}>
                        <div className="dashboard-tabs-user__avatar">
                          <img
                            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                            alt=""
                          />
                        </div>
                        <div className="dashboard-tabs-user__name">
                          <span>John Doe</span>
                        </div>
                      </div>
                      <div
                        className={`dashboard-tabs-addUser ${
                          activeClass === "invite" && "active"
                        }`}
                        onClick={() => handleShowActive("invite")}>
                        <span>
                          <FaPlus />
                        </span>
                        <span>Invite People </span>
                      </div>
                    </div>
                  </div>
                </div>
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
