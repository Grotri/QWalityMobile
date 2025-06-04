import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import React, { useEffect, useState } from "react";
import {
  AppState,
  LogBox,
  StatusBar as NativeStatusBar,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { getToken } from "./src/api/token";
import Loader from "./src/components/atoms/Loader/Loader";
import { palette } from "./src/constants/palette";
import useAccountStore from "./src/hooks/useAccountStore";
import useAuthStore from "./src/hooks/useAuthStore";
import useCamerasStore from "./src/hooks/useCamerasStore";
import i18n from "./src/i18n";
import { TLanguage } from "./src/model/user";
import { Navigation } from "./src/navigation";

const App = () => {
  const { user, language, setLanguage, fetchUserInfo } = useAuthStore();
  const { fetchAccounts } = useAccountStore();
  const { fetchCameras } = useCamerasStore();
  const [areFontsLoaded, setAreFontsLoaded] = useState<boolean>(false);

  LogBox.ignoreLogs(["useInsertionEffect must not schedule updates"]);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        "Segoe-UI-900": require("./assets/fonts/Segoe UI Black.ttf"),
        "Segoe-UI-800": require("./assets/fonts/Segoe UI Bold.ttf"),
        "Segoe-UI-700": require("./assets/fonts/Segoe UI Semibold.ttf"),
        "Segoe-UI-500": require("./assets/fonts/Segoe UI Semilight.ttf"),
      });
      setAreFontsLoaded(true);
    };

    const setupFullScreen = async () => {
      if (Platform.OS !== "android") return;

      await NavigationBar.setBackgroundColorAsync("#00000000");
      await NavigationBar.setVisibilityAsync("hidden");
      await NavigationBar.setBehaviorAsync("inset-swipe");

      NativeStatusBar.setHidden(true);
      NativeStatusBar.setTranslucent(true);

      const appStateListener = AppState.addEventListener(
        "change",
        (nextAppState) => {
          if (nextAppState === "active") {
            NavigationBar.setVisibilityAsync("hidden");
            NativeStatusBar.setHidden(true);
          }
        }
      );

      return () => appStateListener.remove();
    };

    const loadLanguage = async () => {
      const storageLang = await AsyncStorage.getItem("language");
      if (storageLang) {
        setLanguage(storageLang as TLanguage);
      } else {
        setLanguage("ru");
      }
    };

    loadFont();
    loadLanguage();
    if (Platform.OS === "android") {
      setupFullScreen();
    }
  }, [setLanguage]);

  useEffect(() => {
    i18n.changeLanguage(language);
    AsyncStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    if (user.id) {
      fetchCameras();
      if (user.role === "owner" || user.role === "admin") {
        fetchAccounts();
      }
    }
  }, [fetchAccounts, fetchCameras, user.id, user.role]);

  useEffect(() => {
    const checkTokenAndFetchUser = async () => {
      const token = await getToken();
      if (token) {
        fetchUserInfo(true);
      }
    };

    checkTokenAndFetchUser();
  }, [fetchUserInfo]);

  if (!areFontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <>
      {Platform.OS === "android" && <NativeStatusBar hidden translucent />}
      <Navigation />
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.bg,
  },
});

export default App;
