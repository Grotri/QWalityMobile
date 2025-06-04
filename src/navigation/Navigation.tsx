import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Platform, StatusBar, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { toastConfig } from "../helpers/toastConfig";
import useAuthStore from "../hooks/useAuthStore";
import { usePalette } from "../hooks/usePalette";
import { authRoutes, mainRoutes, subscriptionRoutes } from "./routes";
import {
  TypeAuthStackParamList,
  TypeMainStackParamList,
  TypeSubscriptionStackParamList,
} from "./types";

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator<TypeAuthStackParamList>();
const MainStack = createNativeStackNavigator<TypeMainStackParamList>();
const SubscriptionStack =
  createNativeStackNavigator<TypeSubscriptionStackParamList>();

const AuthTabs = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    {authRoutes.map(({ name, component }) => (
      <AuthStack.Screen
        key={name}
        name={name}
        component={component}
        options={({ route }) => ({
          animation:
            route.params?.direction === "backward"
              ? "slide_from_left"
              : "slide_from_right",
        })}
      />
    ))}
  </AuthStack.Navigator>
);

const MainTabs = () => (
  <MainStack.Navigator screenOptions={{ headerShown: false }}>
    {mainRoutes.map(({ name, component }) => (
      <MainStack.Screen
        key={name}
        name={name}
        component={component}
        options={({ route }) => ({
          animation:
            route.params?.direction === "backward"
              ? "slide_from_left"
              : "slide_from_right",
        })}
      />
    ))}
  </MainStack.Navigator>
);

const SubscriptionTabs = () => (
  <SubscriptionStack.Navigator screenOptions={{ headerShown: false }}>
    {subscriptionRoutes.map(({ name, component }) => (
      <SubscriptionStack.Screen
        key={name}
        name={name}
        component={component}
        options={({ route }) => ({
          animation:
            route.params?.direction === "backward"
              ? "slide_from_left"
              : "slide_from_right",
        })}
      />
    ))}
  </SubscriptionStack.Navigator>
);

export const Navigation = () => {
  const { user } = useAuthStore();
  const palette = usePalette();

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: palette.bg }}>
        <View style={{ flex: 1, backgroundColor: palette.bg }}>
          <NavigationContainer>
            <StatusBar
              barStyle={
                user.theme === "light" ? "dark-content" : "light-content"
              }
              hidden={Platform.OS !== "ios"}
            />
            <RootStack.Navigator
              screenOptions={{
                animation: "slide_from_right",
                headerShown: false,
              }}
            >
              {!user.id ? (
                <RootStack.Screen name="AuthTabs" component={AuthTabs} />
              ) : user.subscription ? (
                <RootStack.Screen name="MainTabs" component={MainTabs} />
              ) : (
                <RootStack.Screen
                  name="SubscriptionTabs"
                  component={SubscriptionTabs}
                />
              )}
            </RootStack.Navigator>
          </NavigationContainer>
        </View>
        <Toast config={toastConfig()} />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};
