import { ReactNode } from "react";

export interface IModal {
  children: ReactNode;
  isVisible: boolean;
  setIsVisible?: (visible: boolean) => void;
  onPress?: () => void;
  onBackdropPress?: () => void;
}
