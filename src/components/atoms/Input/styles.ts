import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    container: {
      gap: 2,
    },
    label: {
      color: palette.mainText,
      fontFamily: fonts.regular,
      fontSize: getFontSize(14),
      lineHeight: getLineHeight(19),
      paddingLeft: 4,
    },
    input: {
      backgroundColor: palette.inputDefaultBg,
      borderRadius: 8,
      height: 30,
      paddingVertical: 0,
      paddingHorizontal: 8,
      color: palette.black,
      fontFamily: fonts.regular,
      fontSize: getFontSize(14),
      lineHeight: getLineHeight(19),
      textAlignVertical: "center",
      includeFontPadding: false,
    },
    inputError: {
      borderBottomWidth: 2,
      borderColor: palette.error,
    },
    inputIcon: {
      paddingRight: 44,
    },
    rightIcon: {
      position: "absolute",
      right: 8,
      top: "50%",
      transform: [{ translateY: "-50%" }],
    },
    error: {
      paddingLeft: 4,
      fontSize: getFontSize(12),
      lineHeight: getLineHeight(16),
      color: palette.error,
      fontFamily: fonts.semibold,
    },
  });
};
