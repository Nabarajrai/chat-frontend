import { useCallback, useState } from "react";
import PropTypes from "prop-types";
//context
import { TabsContext } from "./Tabs.context";

const TabsProvider = ({ children }) => {
  const [tabName, setTabName] = useState("general");
  const [activeTabId, setActiveTabId] = useState(null);

  const handleTabChangeName = useCallback((name) => {
    setTabName(name);
  }, []);

  const handleActiveTabIdChange = useCallback((id) => {
    setActiveTabId(id);
  }, []);

  const value = {
    tabName,
    handleTabChangeName,
    activeTabId,
    handleActiveTabIdChange,
  };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};
export default TabsProvider;

TabsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
