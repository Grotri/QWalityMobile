import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    listPoint: {
      paddingTop: 8,
      paddingRight: 16,
      paddingBottom: 8,
      paddingLeft: 8,
      borderRadius: 14,
      alignSelf: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      gap: 12,
    },
    listPointCircle: {
      width: 13,
      height: 13,
      borderRadius: 50,
      opacity: 80,
      backgroundColor: palette.welcomeScreenPoint,
    },
    listPointText: {
      color: palette.welcomeScreenMainText,
      fontFamily: fonts.bold,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      borderWidth: 1,
      borderColor: "transparent",
    },
  });
};
