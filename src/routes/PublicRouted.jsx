import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { UserContext } from "../context";

const PublicRoutes = () => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();

  if (currentUser === undefined) return null;
  const path = location?.state?.from?.pathname || "/client/23423";

  return !currentUser ? (
    <Outlet />
  ) : (
    <Navigate to={path} state={{ from: location }} replace />
  );
};

export default PublicRoutes;
