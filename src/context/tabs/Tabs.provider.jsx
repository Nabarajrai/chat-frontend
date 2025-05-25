import { useCallback, useState } from "react";
import PropTypes from "prop-types";
//context
import { TabsContext } from "./Tabs.context";

const TabsProvider = ({ children }) => {
  const [tabName, setTabName] = useState("general");

  const handleTabChangeName = useCallback((name) => {
    setTabName(name);
  }, []);
  const value = {
    tabName,
    handleTabChangeName,
  };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};
export default TabsProvider;

TabsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
