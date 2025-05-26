import { removeRefresh, removeToken } from "../api/token";
import useAuthStore from "../hooks/useAuthStore";

export const forceLogout = async () => {
  const { clearUser } = useAuthStore.getState();
  removeToken();
  removeRefresh();
  clearUser();
};
