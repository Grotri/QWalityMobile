import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    profileWrapper: {
      marginTop: 16,
      alignItems: "center",
      gap: 20,
      paddingHorizontal: 28,
      paddingBottom: 28,
    },
    card: {
      backgroundColor: palette.folderOrHighlightedSectionBg,
      borderRadius: 12,
      width: "85%",
      paddingVertical: 8,
      paddingHorizontal: 12,
      gap: 8,
    },
    cardPointTitle: {
      color: palette.sectionTransparentText,
      fontSize: getFontSize(12),
      lineHeight: getLineHeight(16),
    },
    cardPointData: {
      color: palette.mainText,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      fontFamily: fonts.semibold,
    },
    btn: {
      minWidth: "64%",
      height: 35,
      borderRadius: 12,
    },
    btnText: {
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      color: palette.mainText,
      fontFamily: fonts.bold,
    },
    input: {
      backgroundColor: palette.textFieldInFolderBg,
      borderRadius: 6,
      paddingHorizontal: 4,
      height: 22,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      color: palette.mainText,
      fontFamily: fonts.semibold,
      marginTop: 1,
    },
    confirmationWrapper: {
      width: "85%",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 16,
    },
    confirmationInputWrapper: {
      width: "50%",
      flex: 1,
    },
    confirmationInput: {
      backgroundColor: palette.textFieldInFolderBg,
      height: 27,
      color: palette.mainText,
      fontFamily: fonts.semibold,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
    },
    confirmationInputLabel: {
      fontSize: 12,
      lineHeight: 17,
      color: palette.codeTransparentText,
    },
    codeBtn: {
      height: 27,
      width: "50%",
      flex: 1,
      borderRadius: 8,
      marginTop: 19,
    },
    codeBtnText: {
      color: palette.mainText,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(18),
      fontFamily: fonts.semibold,
    },
    supportTextWrapper: {
      alignItems: "center",
    },
    supportText: {
      lineHeight: getLineHeight(16),
      fontSize: getFontSize(12),
      color: palette.supportTransparentText,
    },
    supportTextUnderlined: {
      textDecorationLine: "underline",
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
