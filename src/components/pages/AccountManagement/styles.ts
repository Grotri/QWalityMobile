import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    managerWrapper: {
      flex: 1,
      marginTop: 8,
      marginBottom: 28,
      paddingHorizontal: 34,
      width: "100%",
      alignItems: "center",
    },
    accordion: {
      width: "100%",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 20,
      paddingVertical: 10,
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    headerText: {
      color: palette.mainText,
      fontFamily: fonts.semibold,
    },
    content: {
      backgroundColor: palette.folderOrHighlightedSectionBg,
      borderRadius: 10,
      padding: 8,
      gap: 2,
    },
    inputWrapperStyles: {
      width: "64%",
      height: 26,
    },
    input: {
      backgroundColor: palette.textFieldInFolderBg,
      borderRadius: 6,
      paddingHorizontal: 6,
      height: 26,
      color: palette.mainText,
      fontFamily: fonts.semibold,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      marginBottom: 4,
      width: "100%",
      paddingRight: 36,
    },
    inputLabel: {
      color: palette.labelTransparentText,
    },
    errorStyles: {
      lineHeight: getLineHeight(12),
    },
    dropdownWrapper: {
      width: "64%",
    },
    dropdown: {
      backgroundColor: palette.textFieldInFolderBg,
      height: 26,
      borderRadius: 6,
      paddingHorizontal: 6,
    },
    selectedTextStyle: {
      fontFamily: fonts.semibold,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
    },
    itemContainerStyle: {
      paddingVertical: 6,
    },
    btns: {
      width: "100%",
      justifyContent: "flex-end",
      flexDirection: "row",
      gap: 8,
    },
    btn: {
      width: "30%",
      height: 26,
      borderRadius: 6,
    },
    btnText: {
      fontSize: getFontSize(14),
      lineHeight: getLineHeight(19),
      color: palette.mainText,
      fontFamily: fonts.semibold,
    },
    noAccounts: {
      marginTop: 28,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      fontFamily: fonts.semibold,
      color: palette.sectionTransparentText,
    },
  });
};
