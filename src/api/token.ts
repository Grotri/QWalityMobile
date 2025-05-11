import AsyncStorage from "@react-native-async-storage/async-storage";
const TOKEN = "TOKEN";
const REFRESH = "REFRESH";

// Token
export const setToken = async (token: string) => {
  await AsyncStorage.setItem(TOKEN, token);
};

export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(TOKEN);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem(TOKEN);
};

// Refresh token
export const setRefresh = async (token: string) => {
  await AsyncStorage.setItem(REFRESH, token);
};

export const getRefresh = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(REFRESH);
};

export const removeRefresh = async () => {
  await AsyncStorage.removeItem(REFRESH);
};
