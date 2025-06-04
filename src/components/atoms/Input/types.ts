import { ReactNode } from "react";
import {
  InputModeOptions,
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

export interface IInput {
  value?: string;
  label?: string;
  customStyles?: StyleProp<ViewStyle>;
  customInputWrapperStyles?: StyleProp<ViewStyle>;
  customInputStyles?: StyleProp<TextStyle>;
  customLabelStyles?: StyleProp<TextStyle>;
  errorStyles?: StyleProp<TextStyle>;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  keyboardAppearance?: "default" | "light" | "dark";
  inputMode?: InputModeOptions;
  maxLength?: number;
  secureTextEntry?: boolean;
  placeholderTextColor?: string;
  rightIcon?: ReactNode;
  cursorColor?: string;
  errorText?: string;
}
