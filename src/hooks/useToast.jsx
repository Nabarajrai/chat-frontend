import { useCallback } from "react";
import { toast } from "react-toastify";

export const useToast = () => {
  const showToast = useCallback((message, type = "info", options = {}) => {
    type =
      type && ["success", "error", "info", "warning"].includes(type)
        ? type
        : "info";

    const defaultOptions = {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };
    toast[type](message, {
      ...defaultOptions,
      ...options,
    });
  }, []);

  return { showToast };
};
