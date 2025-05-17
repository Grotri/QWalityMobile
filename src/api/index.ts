import axios from "axios";
import { showErrorToast } from "../helpers/toast";
import i18n from "../i18n";
import { forceLogout } from "./forceLogout";
import { getRefresh, getToken, setToken } from "./token";

const api = axios.create({
  baseURL: "https://api.qwality.space",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefresh();

      if (!refreshToken) {
        forceLogout();
        return Promise.reject(error);
      }

      try {
        const res = await api.post("/auth/refresh", {
          refresh_token: refreshToken,
        });

        const newAccessToken = res.data.access_token;
        setToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        showErrorToast(i18n.t("sessionExpired"));
        forceLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
