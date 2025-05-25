import { createContext, useContext } from "react";

export const TabsContext = createContext({
  tabName: "general",
  handleTabChangeName: () => {},
});

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabsContext must be used within a TabsProvider");
  }
  return context;
};
