import { useState, useContext, useCallback } from "react";
import { api, APIS } from "../config/Api.config";
import { UserContext } from "../context/User.context";
import { setLocalStorage } from "../helpers/LocatStorage.helper";
import { useToast } from "./useToas";

export const useAuth = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useContext(UserContext);
  const { showToast } = useToast();

  const showToastHanlder = useCallback(
    (message, type) => {
      console.log("message: " + message);
      showToast(message, type);
    },
    [showToast]
  );

  console.log(error, loading);

  const login = async (body) => {
    setLoading(true);
    try {
      const res = await api(APIS.login, "POST", body);
      showToastHanlder(res?.message, "success");
      setCurrentUser(res?.data);
      setLocalStorage("user", res?.data);
    } catch (e) {
      setError(e?.message);
      return e.message;
    } finally {
      setLoading(false);
    }
  };
  return { login };
};
