import { ComponentType } from "react";

export interface IAuthRoute {
  name: keyof TypeAuthStackParamList;
  component: ComponentType;
}

export interface IMainRoute {
  name: keyof TypeMainStackParamList;
  component: ComponentType;
}

export interface ISubscriptionRoute {
  name: keyof TypeSubscriptionStackParamList;
  component: ComponentType;
}

type NavigationParams = {
  direction?: "backward";
  sliderId?: string;
};

export type TypeAuthStackParamList = {
  Home: NavigationParams | undefined;
  Registration: NavigationParams | undefined;
  Login: NavigationParams | undefined;
  ForgotPassword: NavigationParams | undefined;
};

export type TypeMainStackParamList = {
  Profile: NavigationParams | undefined;
  Admin: NavigationParams | undefined;
  AccountManagement: NavigationParams | undefined;
  FAQ: NavigationParams | undefined;
  Main: NavigationParams | undefined;
  Settings: NavigationParams | undefined;
  TrashBin: NavigationParams | undefined;
  SubscriptionChange: NavigationParams | undefined;
  PaymentChange: NavigationParams | undefined;
};

export type TypeSubscriptionStackParamList = {
  Subscription: NavigationParams | undefined;
  Payment: NavigationParams | undefined;
};
