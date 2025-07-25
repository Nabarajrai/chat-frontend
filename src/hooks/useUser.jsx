import { useCallback, useState } from "react";
import { api, APIS } from "../config/Api.config";

export const useUser = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const getUserById = useCallback(async (userId) => {
    setUserLoading(true);
    try {
      const res = await api(`${APIS.getByUserId}/${userId}`, "GET");
      if (res?.status === "success") {
        setUserLoading(false);
        setUserDetails(res?.data);
      } else {
        setUserLoading(false);
        setErrorMessage(res?.message || "Failed to fetch user details");
      }
    } catch (e) {
      setErrorMessage(e?.response?.data?.message || e?.message || "An error");
    } finally {
      setUserLoading(false);
    }
  }, []);

  return { userLoading, userDetails, errorMessage, getUserById };
};
