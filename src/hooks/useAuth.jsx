/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api, APIS } from "../config/Api.config";
import { UserContext } from "../context/User.context";
import { setLocalStorage } from "../helpers/LocatStorage.helper";
import { useToast } from "./useToast";

export const useAuth = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useContext(UserContext);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.state?.from.path || "/client/32432";
  const showToastHanlder = useCallback(
    (message, type) => {
      showToast(message, type);
    },
    [showToast]
  );

  const login = useCallback(async (body) => {
    setLoading(true);
    try {
      const res = await api(APIS.login, "POST", body);
      showToastHanlder(res?.message, "success");
      setCurrentUser(res?.data);
      setLocalStorage("user", res?.data);
      navigate(path, { replace: true });
    } catch (e) {
      setError(e?.message);
      return e.message;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (body) => {
    setLoading(true);
    try {
      const res = await api(APIS.register, "POST", body);
      console.log("register", res);
      showToastHanlder(res?.message, "success");
      navigate("/login");
    } catch (e) {
      setError(e?.message);
      return e.message;
    } finally {
      setLoading(false);
    }
  }, []);

  return { login, error, setError, loading, setLoading, register };
};
