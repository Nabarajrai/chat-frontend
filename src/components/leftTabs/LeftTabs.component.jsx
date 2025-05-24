import { useState, useCallback, useMemo } from "react";
import classnames from "classnames";

//components
import ButtonComponent from "../button/Button.component";

//hooks
import { useDropdown } from "../../hooks/useDropdown";
import { useClassName } from "../../hooks/useActiveClass";

//icons
import { FaPlus } from "react-icons/fa";
import { MdNavigateBefore } from "react-icons/md";
import { FaHashtag } from "react-icons/fa6";
const LeftTabsComponent = () => {
  const [activeClass, setActiveClass] = useState("channels");

  const [showDropdownDm, setShowDropdownDm] = useState();

  const { showDropdown, toggle } = useDropdown();

  const { activeClassName, combinedClassName } = useClassName();

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

  const handleShowActive = useCallback((type) => {
    setActiveClass(type);
  }, []);
  const activeClassNamesDM = activeClassName(showDropdownDm, "active");

  const combineClassTitleDM = combinedClassName(
    "dashboard-tabs-dm-title ",
    activeClassNamesDM
  );
  const activeClassNameDM = activeClassName(showDropdownDm, "active");

  const combineClassDM = combinedClassName(
    "dashboard-tabs-dm-dropdown",
    activeClassNameDM
  );
  const handleDm = useCallback(() => {
    setShowDropdownDm((prev) => !prev);
  }, []);
  return (
    <div className="dashboard-tab">
      <div className="dashboard-tab-lists">
        <div className="dashboard-tabs">
          <div className="dashboard-tabs__room">
            <ButtonComponent size="lg" varient="primary">
              <span className="dashboard-tabs__room--title">Meeting Room</span>
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
            <div className={combineClassTitleDM} onClick={handleDm}>
              <span className="icon">
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
  );
};

export default LeftTabsComponent;
