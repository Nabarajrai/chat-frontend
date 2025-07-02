import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
//context
import { UserContext } from "../context";

const ProtectedRoutes = () => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();

  if (currentUser === undefined) return null;

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
