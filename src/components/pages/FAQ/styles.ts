import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    managerWrapper: {
      marginTop: 16,
      paddingHorizontal: 28,
      width: "100%",
    },
    accordion: {
      width: "100%",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 8,
      paddingHorizontal: 18,
    },
    headerText: {
      flexWrap: "wrap",
      fontSize: getFontSize(20),
      lineHeight: getLineHeight(27),
      color: palette.mainText,
      fontFamily: fonts.bold,
      maxWidth: "80%",
    },
    content: {
      backgroundColor: palette.folderOrHighlightedSectionBg,
      borderRadius: 10,
      paddingHorizontal: 18,
      paddingVertical: 12,
      marginBottom: 8,
      display: "flex",
      gap: 4,
    },
    contentText: {
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(22),
      color: palette.mainText,
      fontFamily: fonts.semibold,
    },
    noQuestions: {
      alignSelf: "center",
      marginTop: 28,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(16),
      fontFamily: fonts.semibold,
      color: palette.sectionTransparentText,
    },
  });
};
