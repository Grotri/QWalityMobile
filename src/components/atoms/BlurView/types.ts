import { StyleProp, ViewStyle } from "react-native";

export interface IBlurView {
  onPress?: () => void;
  customIOSStyles?: StyleProp<ViewStyle>;
}
