import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface IRadio {
  label: string;
  isChecked: boolean;
  setIsChecked?: () => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  radioWrapperStyle?: StyleProp<ViewStyle>;
}
