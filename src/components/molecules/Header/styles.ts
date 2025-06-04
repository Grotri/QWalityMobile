import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    wrapper: {
      width: "100%",
      gap: 10,
      alignItems: "center",
      padding: 28,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      position: "relative",
    },
    headerTextWrapper: {
      position: "absolute",
      left: "50%",
      transform: [{ translateX: "-50%" }],
    },
    headerText: {
      color: palette.mainText,
      fontFamily: fonts.bold,
      fontSize: getFontSize(20),
      lineHeight: getLineHeight(27),
      textAlign: "center",
    },
    line: {
      backgroundColor: palette.blue3,
      height: 3,
      width: "52%",
      opacity: 0.75,
    },
    language: {
      position: "absolute",
      right: 0,
      top: "50%",
      transform: [{ translateY: "-50%" }],
      padding: 6,
      borderRadius: 4,
      minWidth: 28,
    },
    languageText: {
      color: palette.mainText,
      fontFamily: fonts.semibold,
      fontSize: getFontSize(14),
      lineHeight: getLineHeight(16),
    },
  });
};
