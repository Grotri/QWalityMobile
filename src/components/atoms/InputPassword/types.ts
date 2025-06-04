import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface IInputPassword {
  value?: string;
  label?: string;
  customStyles?: StyleProp<ViewStyle>;
  customInputWrapperStyles?: StyleProp<ViewStyle>;
  customInputStyles?: StyleProp<TextStyle>;
  customLabelStyles?: StyleProp<TextStyle>;
  errorStyles?: StyleProp<TextStyle>;
  onChangeText?: (text: string) => void;
  cursorColor?: string;
  errorText?: string;
  iconColor?: string;
  iconSize?: number;
  placeholder?: string;
}
