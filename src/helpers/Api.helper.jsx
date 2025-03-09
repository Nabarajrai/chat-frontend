import axios from "axios";

export const apiGenerator = ({ baseUrl }) => {
  return async function api(url, method = "GET", body = null, apiConfig = {}) {
    const config = {
      baseUrl,
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
    if (body && !(body instanceof FormData)) {
      config.headers["Content-Type "] = "aplication.json";
    }
    if (config?.file) {
      delete config.headers["Content-Type"];
    }
    try {
      const response = await axios(config);
      console.log(response);
      return response;
    } catch (e) {
      console.log(e);
      const errorMessage = e?.response?.data?.message || e?.message;
      throw new Error(errorMessage);
    }
  };
};
