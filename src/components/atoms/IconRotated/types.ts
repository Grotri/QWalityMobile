import { SharedValue } from "react-native-reanimated";

export interface IIconRotated {
  icon: JSX.Element;
  isActive: boolean;
  rotation?: SharedValue<number>;
}
