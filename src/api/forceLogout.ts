import { removeRefresh, removeToken } from "../api/token";

let clearUserCallback: (() => void) | null = null;

export const initForceLogout = (clearUser: () => void) => {
  clearUserCallback = clearUser;
};

export const forceLogout = () => {
  removeToken();
  removeRefresh();
  clearUserCallback?.();
};
