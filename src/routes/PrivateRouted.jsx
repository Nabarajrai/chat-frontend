import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
//context
import { UserContext } from "../context";

const ProtectedRoutes = () => {
  const { currentUser } = useContext(UserContext);

  if (currentUser === undefined) return null;

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
