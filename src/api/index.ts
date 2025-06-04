import axios from "axios";
import { showErrorToast } from "../helpers/toast";
import i18n from "../i18n";
import { forceLogout } from "./forceLogout";
import { getRefresh, getToken, setRefresh, setToken } from "./token";

const api = axios.create({
  baseURL: "https://api.qwality.space",
  headers: {
    "Content-Type": "application/json",
  },
});

export const plainAxios = axios.create();

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = await getRefresh();
  if (!refreshToken) return null;

  try {
    const res = await plainAxios.post(
      "https://api.qwality.space/auth/refresh",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    const newAccessToken = res.data.access_token;
    const newRefreshToken = res.data.refresh_token;

    await setToken(newAccessToken);
    if (newRefreshToken) {
      await setRefresh(newRefreshToken);
    }

    return newAccessToken;
  } catch {
    return null;
  }
};

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
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

    if (originalRequest?.url?.includes("/auth/login")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      const newToken = await refreshAccessToken();

      isRefreshing = false;

      if (newToken) {
        onRefreshed(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      }

      showErrorToast(i18n.t("sessionExpired"));
      forceLogout();
    }

    return Promise.reject(error);
  }
);

export default api;
