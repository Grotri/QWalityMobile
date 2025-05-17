import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  AppState,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { palette } from "./src/constants/palette";
import useAuthStore from "./src/hooks/useAuthStore";
import i18n from "./src/i18n";
import { TLanguage } from "./src/model/user";
import { Navigation } from "./src/navigation";

const App = () => {
  const { language, setLanguage } = useAuthStore();
  const [areFontsLoaded, setAreFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        "Segoe-UI-900": require("./assets/fonts/Segoe UI Black.ttf"),
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        "Segoe-UI-800": require("./assets/fonts/Segoe UI Bold.ttf"),
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        "Segoe-UI-700": require("./assets/fonts/Segoe UI Semibold.ttf"),
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        "Segoe-UI-500": require("./assets/fonts/Segoe UI Semilight.ttf"),
      });

      setAreFontsLoaded(true);
    };

    const setupNavigationBar = async () => {
      if (Platform.OS !== "android") return;

      await NavigationBar.setBehaviorAsync("overlay-swipe");
      await NavigationBar.setVisibilityAsync("hidden");

      const unsubscribeVisibility = NavigationBar.addVisibilityListener(
        ({ visibility }) => {
          if (visibility === "visible") {
            NavigationBar.setVisibilityAsync("hidden");
          }
        }
      );

      const appStateListener = AppState.addEventListener(
        "change",
        (nextAppState) => {
          if (nextAppState === "active") {
            NavigationBar.setVisibilityAsync("hidden");
          }
        }
      );

      return () => {
        unsubscribeVisibility.remove();
        appStateListener.remove();
      };
    };

    const loadLanguage = async () => {
      const storageLang = await AsyncStorage.getItem("language");
      setLanguage(storageLang as TLanguage);
    };

    loadFont();
    loadLanguage();

    if (Platform.OS === "android") {
      setupNavigationBar();
    }
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
    AsyncStorage.setItem("language", language);
  }, [language]);

  if (!areFontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={50} color={palette.white} />
      </View>
    );
  }

  return <Navigation />;
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
