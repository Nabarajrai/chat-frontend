/* eslint-disable react-hooks/exhaustive-deps */
import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useContext,
  useRef,
} from "react";
import classnames from "classnames";
import { NavLink, useParams } from "react-router-dom";

//components
import ButtonComponent from "../button/Button.component";

//hooks
import { useDropdown } from "../../hooks/useDropdown";
import { useClassName } from "../../hooks/useActiveClass";
import { useSocket } from "../../hooks/useSocket";

//icons
import { FaPlus } from "react-icons/fa";
import { MdNavigateBefore } from "react-icons/md";
import { FaHashtag } from "react-icons/fa6";

//helpers
import { api, APIS } from "../../config/Api.config";
//contexts
import { UserContext } from "../../context/User.context";
import { useTabsContext } from "../../context/tabs/Tabs.context";

const LeftTabsComponent = () => {
  const [activeClass, setActiveClass] = useState("channels");
  const [activeUserId, setActiveUserId] = useState(null);
  const [activeChannelId, setActiveChannelId] = useState(null);
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [showDropdownDm, setShowDropdownDm] = useState();
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isLoadingChannel, setIsLoadingChannel] = useState(false);
  const socket = useSocket();
  const { currentUser } = useContext(UserContext);
  const { showDropdown, toggle } = useDropdown();
  const { clientId } = useParams();

  const { activeClassName, combinedClassName } = useClassName();
  const { handleTabChangeName, handleActiveTabIdChange } = useTabsContext();
  const ref = useRef(null);

  const joinUser = useCallback(
    (userId) => {
      socket.emit("join-user", userId);
      console.log("Joined user:", userId);
    },
    [socket]
  );

  const activeUserIdHandler = useCallback(
    (user) => {
      setActiveUserId(user?.userId);
      handleTabChangeName(`${user?.firstName} ${user?.lastName}`);
      handleActiveTabIdChange(user?.userId);
      setActiveClass("");
      setActiveChannelId(null);
    },
    [handleTabChangeName, joinUser, handleActiveTabIdChange]
  );

  const activeChannelHandler = useCallback(
    (channel) => {
      handleTabChangeName(channel?.name);
      setActiveChannelId(channel?.id);
      setActiveClass("");
      setActiveUserId(null);
    },
    [handleTabChangeName]
  );

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
    setActiveUserId(null);
    setActiveChannelId(null);
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

  const getUsers = useCallback(async () => {
    setIsLoadingUser(true);
    try {
      const res = await api(APIS.users, "GET");
      if (res?.status === "success") {
        setUsers(res?.data);
        setIsLoadingUser(false);
      } else {
        console.error(res?.message);
      }
    } catch (e) {
      console.error("Error fetching users:", e);
    } finally {
      setIsLoadingUser(false);
    }
  }, []);

  const getChannels = useCallback(async () => {
    setIsLoadingChannel(true);
    try {
      const res = await api(APIS.channels, "GET");
      if (res?.status === "success") {
        setChannels(res?.data);
        setIsLoadingChannel(false);
      } else {
        console.error(res?.message);
      }
    } catch (e) {
      console.error("Error fetching channels:", e);
    } finally {
      {
        setIsLoadingChannel(false);
      }
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getChannels();
  }, []);
  useEffect(() => {
    if (clientId) {
      joinUser(clientId);
    }
  }, [clientId, joinUser]);

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
            <div className={combineClass} ref={ref}>
              {isLoadingUser
                ? "Loading..."
                : channels.map((channel) => (
                    <>
                      <NavLink
                        to={`/client/${channel.id}`}
                        className={({ isActive }) =>
                          `dashboard-tabs__channel--lists ${
                            isActive ? "active" : ""
                          }`
                        }
                        onClick={() => activeChannelHandler(channel)}>
                        <span>
                          <FaHashtag />
                        </span>
                        <span>{channel?.name}</span>
                      </NavLink>
                    </>
                  ))}

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
                {isLoadingChannel
                  ? "Loading..."
                  : users.map((user) => (
                      <>
                        <NavLink
                          to={`/client/${user.userId}`}
                          className={({ isActive }) =>
                            `dashboard-tabs-user  ${isActive ? "active" : ""}`
                          }
                          onClick={() => activeUserIdHandler(user)}>
                          <div className="dashboard-tabs-user__avatar">
                            <img
                              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                              alt=""
                            />
                          </div>
                          <div className="dashboard-tabs-user__name">
                            <span>{`${user.firstName} ${user.lastName}`}</span>
                            {user?.userId === currentUser?.userId && (
                              <span className="you">(Me)</span>
                            )}
                          </div>
                        </NavLink>
                      </>
                    ))}

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
