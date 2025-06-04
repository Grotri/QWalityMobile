import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import useAuthStore from "@/src/hooks/useAuthStore";
import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";

export const getStyles = () => {
  const palette = usePalette();
  const { language } = useAuthStore();

  return StyleSheet.create({
    modals: {
      width: "94%",
      gap: 16,
    },
    modal: {
      width: "100%",
      borderRadius: 12,
      backgroundColor: palette.bgMainScreenPopup,
      padding: 12,
      alignItems: "center",
      gap: 12,
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
    customTitleStyles: {
      width: "70%",
      marginBottom: 4,
    },
    customTitleInputStyles: {
      backgroundColor: palette.textFieldBgMainScreenPopup,
      fontSize: getFontSize(20),
      lineHeight: getLineHeight(27),
      fontFamily: fonts.semibold,
      color: palette.mainText,
      textAlign: "center",
    },
    customStyles: {
      width: "90%",
    },
    customInputStyles: {
      backgroundColor: palette.textFieldBgMainScreenPopup,
      color: palette.mainText,
      fontFamily: fonts.semibold,
    },
    customLabelStyles: {
      color: palette.subTextMainScreenPopup,
    },
    stateWrapper: {
      gap: 8,
      width: "90%",
    },
    stateText: {
      color: palette.subTextMainScreenPopup,
      fontFamily: fonts.regular,
    },
    stateRadios: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    radioLabelStyle: {
      fontSize: getFontSize(14),
      lineHeight: getLineHeight(19),
      fontFamily: fonts.regular,
    },
    radioWrapperStyle: {
      gap: 8,
    },
    btns: {
      width: "90%",
      gap: 8,
      marginBottom: 4,
    },
    flexBtns: {
      width: "100%",
      flexDirection: language === "fr" ? "column" : "row",
      alignItems: "center",
      gap: 16,
      marginTop: 4,
    },
    btn: {
      flex: language === "fr" ? 0 : 1,
      width: language === "fr" ? "100%" : "auto",
      borderRadius: 8,
      height: 27,
    },
    btnText: {
      fontFamily: fonts.semibold,
      color: palette.mainText,
    },
    fullBtn: {
      borderRadius: 8,
      paddingVertical: 3,
    },
    fullBtnText: {
      fontFamily: fonts.semibold,
      color: palette.mainText,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
    },
    smallModalTitle: {
      fontFamily: fonts.bold,
      color: palette.mainText,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      textAlign: "center",
    },
    smallModalBtns: {
      width: "90%",
      flexDirection: "row",
      alignItems: "center",
      gap: 42,
    },
    btnBolderText: {
      fontFamily: fonts.bold,
      color: palette.mainText,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
    },
  });
};
