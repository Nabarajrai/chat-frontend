/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getLocalStorage } from "../helpers/LocatStorage.helper";

const intialState = null;

export const UserContext = createContext({
  currentUser: intialState,
  setCurrentUser: () => {},
});

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getLocalStorage("user"));

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

CurrentUserProvider.protoTypes = {
  children: PropTypes.node.isRequired,
};
