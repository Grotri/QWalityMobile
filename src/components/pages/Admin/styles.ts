import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    adminWrapper: {
      marginTop: 4,
      paddingHorizontal: 54,
      width: "100%",
      alignItems: "center",
      paddingBottom: 28,
    },
    subTitle: {
      color: palette.mainText,
      fontFamily: fonts.bold,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      marginBottom: 12,
    },
    loaderWrapper: {
      marginBottom: 36,
      height: 40,
    },
    confirmationInputWrapper: {
      width: "100%",
      paddingHorizontal: 12,
      marginBottom: 4,
    },
    confirmationInput: {
      backgroundColor: palette.textFieldInFolderBg,
      height: 32,
      color: palette.mainText,
      fontFamily: fonts.semibold,
    },
    confirmationInputLabel: {
      color: palette.subTextMainScreenPopup,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(20),
    },
    dropdownWrapper: {
      paddingHorizontal: 12,
      marginBottom: 28,
    },
    dropdownLabelStyle: {
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(19),
    },
    dropdownMainStyle: {
      height: 32,
      borderRadius: 10,
      backgroundColor: palette.textFieldInFolderBg,
    },
    selectedMainTextStyle: {
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(20),
    },
    btn: {
      marginBottom: 20,
      height: 35,
      borderRadius: 12,
      minWidth: "72%",
    },
    btnText: {
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(23),
      color: palette.mainText,
      fontFamily: fonts.semibold,
    },
    statistics: {
      color: palette.supportTransparentText,
    },
  });
};
