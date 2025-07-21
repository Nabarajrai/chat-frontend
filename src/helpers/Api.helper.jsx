import axios from "axios";

export const apiGenerator = ({ baseURL }) => {
  return async function api(url, method = "GET", body = null, apiConfig = {}) {
    const config = {
      baseURL,
      url,
      method,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      ...apiConfig,
    };
    if (body) {
      config.data = body;
    }

    if (config?.file) {
      delete config.headers["Content-Type"];
    }
    try {
      const response = await axios(config);
      return response.data;
    } catch (e) {
      console.log(e);
      const errorMessage = e?.response?.data?.message || e?.message;
      throw new Error(errorMessage);
    }
  };
};
