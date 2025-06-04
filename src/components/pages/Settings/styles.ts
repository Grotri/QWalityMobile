import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    wrapper: {
      flex: 1,
      paddingHorizontal: 36,
      marginTop: 12,
      alignItems: "center",
    },
    dropdownWrapper: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
      gap: 12,
    },
    dropdownStyle: {
      height: 28,
    },
    dropdownText: {
      color: palette.mainText,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      fontFamily: fonts.semibold,
      flexShrink: 1,
    },
    wrapperStyle: {
      width: 108,
    },
    btn: {
      height: 34,
      borderRadius: 10,
      width: "64%",
    },
    btnText: {
      color: palette.mainText,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      fontFamily: fonts.semibold,
    },
    version: {
      color: palette.supportTransparentText,
      fontSize: getFontSize(12),
      lineHeight: getLineHeight(16),
      fontFamily: fonts.semibold,
    },
    modal: {
      width: "90%",
      paddingVertical: 16,
      paddingHorizontal: 30,
      borderRadius: 14,
      backgroundColor: palette.subScreenPopupBg,
      alignItems: "center",
      gap: 20,
    },
    modalText: {
      color: palette.mainText,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      fontFamily: fonts.bold,
      textAlign: "center",
    },
    modalBtns: {
      flexDirection: "row",
      gap: 32,
      alignItems: "center",
    },
    modalBtn: {
      flex: 1,
      height: 27,
      borderRadius: 8,
    },
    modalBtnText: {
      color: palette.mainText,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      fontFamily: fonts.bold,
    },
    confirmationWrapper: {
      flexDirection: "row",
      gap: 14,
      marginTop: -12,
    },
    customStyles: {
      flex: 1,
    },
    codeBtn: {
      width: "44%",
      height: 27,
      borderRadius: 8,
      marginTop: 21,
    },
    modalBtnCodeText: {
      color: palette.mainText,
      fontSize: getFontSize(12),
      lineHeight: getLineHeight(19),
      fontFamily: fonts.regular,
    },
    customInputStyles: {
      height: 27,
      color: "#000033",
      fontFamily: fonts.semibold,
    },
    customLabelStyles: {
      color: palette.codeTransparentText,
      fontSize: 12,
      lineHeight: 19,
    },
  });
};
