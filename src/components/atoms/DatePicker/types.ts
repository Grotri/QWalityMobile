import { StyleProp, ViewStyle } from "react-native";

export interface IDatePicker {
  date: Date | null;
  setDate: (date: Date) => void;
  datePickerStyle?: StyleProp<ViewStyle>;
}
