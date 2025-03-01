/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import PropTypes from "prop-types";

const intialState = null;

export const UserContext = createContext({
  currentUser: intialState,
  setCurrentUser: () => {},
});

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

CurrentUserProvider.protoTypes = {
  children: PropTypes.node.isRequired,
};
