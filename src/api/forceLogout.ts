import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeRefresh, removeToken } from "../api/token";
import useAuthStore from "../hooks/useAuthStore";

export const forceLogout = async () => {
  const { clearUser } = useAuthStore.getState();
  removeToken();
  removeRefresh();
  await AsyncStorage.removeItem("user");
  clearUser();
};
