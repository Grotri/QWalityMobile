import { GestureResponderEvent } from "react-native";

export interface ISliderCard {
  id: number;
  currentId?: number;
  title: string;
  description: string;
  radioLabels: string[];
  price: string;
  onPress?: (event: GestureResponderEvent) => void;
}
