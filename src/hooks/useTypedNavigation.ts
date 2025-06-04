import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TypeAuthStackParamList, TypeMainStackParamList } from "../navigation";
import { TypeSubscriptionStackParamList } from "../navigation/types";

export const useAuthNavigation = () =>
  useNavigation<NavigationProp<TypeAuthStackParamList>>();

export const useMainNavigation = () =>
  useNavigation<NavigationProp<TypeMainStackParamList>>();

export const useSubscriptionNavigation = () =>
  useNavigation<NavigationProp<TypeSubscriptionStackParamList>>();
