import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: palette.bg,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: palette.mainOnlineOfflineBg,
      padding: 16,
      gap: 70,
      alignItems: "center",
    },
    headerSearch: {
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
      flex: 1,
    },
    title: {
      width: 100,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      fontFamily: fonts.semibold,
      color: palette.mainText,
    },
    input: {
      flex: 1,
    },
    customInputStyles: {
      height: 22,
      backgroundColor: palette.searchBarBg,
      paddingRight: 28,
      color: palette.mainText,
    },
    emptyList: {
      backgroundColor: palette.subBg,
      padding: 12,
      alignItems: "center",
    },
    emptyText: {
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(16),
      fontFamily: fonts.semibold,
      color: palette.sectionTransparentText,
    },
    errorText: {
      marginTop: 28,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      fontFamily: fonts.semibold,
      color: palette.error,
    },
  });
};
