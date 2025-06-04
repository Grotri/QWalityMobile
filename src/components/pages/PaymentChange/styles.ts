import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    wrapper: {
      flex: 1,
      paddingHorizontal: 28,
      marginTop: 40,
      alignItems: "center",
      gap: 36,
    },
    title: {
      color: palette.mainText,
      fontSize: getFontSize(20),
      lineHeight: getLineHeight(28),
      fontFamily: fonts.semibold,
      textAlign: "center",
    },
    btn: {
      height: 34,
      borderRadius: 12,
      width: "80%",
    },
    btnText: {
      color: palette.mainText,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(18),
      fontFamily: fonts.semibold,
    },
  });
};
