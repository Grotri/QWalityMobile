import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

export interface IIcon {
  style?: StyleProp<ViewStyle>;
  color?: string;
  height?: number;
  width?: number;
  opacity?: number;
  onClick?: (event: GestureResponderEvent) => void;
  stroke?: number;
  disabled?: boolean;
  isActive?: boolean;
}
