import { createBrowserRouter } from "react-router";
//router
import ProtectedRoutes from "./PrivateRouted";
import PublicRoutes from "./PublicRouted";
//pages
import HomePage from "../pages/home/Home.page";
import LoginPage from "../pages/login/Login.page";
import RegisterPage from "../pages/register/Register.page";
import CallPage from "../pages/call/Call.page";

export const routes = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/client/:clientId",
        element: <HomePage />,
      },
      {
        path: "/join-room/:roomId",
        element: <CallPage />,
      },
    ],
  },
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);
