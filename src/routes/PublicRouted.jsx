import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { UserContext } from "../context";

const PublicRoutes = () => {
  const { currentUser } = useContext(UserContext);

  if (currentUser === undefined) return null;

  return !currentUser ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoutes;
