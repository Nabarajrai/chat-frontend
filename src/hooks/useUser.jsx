import { useCallback, useState } from "react";
import { api, APIS } from "../config/Api.config";

export const useUser = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const getUserById = useCallback(async (userId) => {
    try {
      const res = await api(`${APIS.getByUserId}/${userId}`, "GET");
      if (res?.status === "success") {
        setUserDetails(res?.data);
      } else {
        setErrorMessage(res?.message || "Failed to fetch user details");
      }
    } catch (e) {
      setErrorMessage(e?.response?.data?.message || e?.message || "An error");
    }
  }, []);

  return { userDetails, errorMessage, getUserById };
};
