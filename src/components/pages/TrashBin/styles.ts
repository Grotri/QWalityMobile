import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    wrapper: {
      flex: 1,
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: 8,
      gap: 8,
    },
    modal: {
      width: "94%",
      borderRadius: 14,
      backgroundColor: palette.subScreenPopupBg,
      padding: 12,
      alignItems: "center",
      gap: 27,
    },
    crossIconWrapper: {
      width: "100%",
      position: "relative",
      alignItems: "center",
    },
    crossIcon: {
      position: "absolute",
      left: 0,
    },
    modalTitle: {
      fontSize: getFontSize(20),
      lineHeight: getLineHeight(27),
      fontFamily: fonts.semibold,
      color: palette.mainText,
    },
    row: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
      paddingHorizontal: 20,
    },
    empty: {
      width: 16,
    },
    dash: {
      width: 16,
      height: 3,
      borderRadius: 50,
      backgroundColor: palette.dashBg,
    },
    btnModal: {
      flex: 1,
      borderRadius: 8,
      height: 27,
    },
    btnModalText: {
      color: palette.mainText,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      fontFamily: fonts.semibold,
    },
    emptyText: {
      color: palette.supportTransparentText,
    },
    noDefects: {
      marginTop: 28,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      fontFamily: fonts.semibold,
      color: palette.sectionTransparentText,
      alignSelf: "center",
    },
    errorText: {
      marginTop: 28,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      fontFamily: fonts.semibold,
      color: palette.error,
      alignSelf: "center",
    },
  });
};
