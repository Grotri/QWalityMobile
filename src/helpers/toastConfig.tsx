import { JSX } from "react";
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  InfoToast,
} from "react-native-toast-message";
import { usePalette } from "../hooks/usePalette";
import { getFontSize } from "./getFontSize";

export const toastConfig = () => {
  const palette = usePalette();

  const baseStyle = {
    marginTop: 12,
    borderLeftColor: palette.mainText,
  };

  const text1Style = {
    color: palette.mainText,
    fontSize: getFontSize(14),
  };

  const createToast =
    (Component: typeof BaseToast, bgColor: string) =>
    (props: JSX.IntrinsicAttributes & BaseToastProps) =>
      (
        <Component
          {...props}
          style={{
            ...baseStyle,
            backgroundColor: bgColor,
            height: "auto",
            minHeight: 60,
            paddingVertical: 16,
          }}
          text1Style={text1Style}
          text1NumberOfLines={0}
          text2NumberOfLines={0}
        />
      );

  return {
    success: createToast(BaseToast, palette.successToast),
    error: createToast(ErrorToast, palette.errorToast),
    info: createToast(InfoToast, palette.infoToast),
  };
};
