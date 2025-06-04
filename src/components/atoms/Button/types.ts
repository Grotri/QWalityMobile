import { ReactNode } from "react";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

export interface IButton {
  children: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  color?:
    | "red"
    | "welcomeBlue"
    | "welcomeBrightBlue"
    | "blue"
    | "darkBlue"
    | "edge"
    | "management"
    | "blueTransparent"
    | "modal";
  customColor?: string;
  disabled?: boolean;
}
