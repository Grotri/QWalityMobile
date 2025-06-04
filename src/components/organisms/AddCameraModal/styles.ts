import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    wrapper: {
      width: "100%",
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
    modalTitle: {
      fontSize: getFontSize(20),
      lineHeight: getLineHeight(27),
      fontFamily: fonts.semibold,
      color: palette.mainText,
      marginBottom: 4,
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
    btn: {
      alignSelf: "flex-end",
      marginTop: 18,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingBottom: 2,
    },
    btnText: {
      color: palette.mainText,
      fontFamily: fonts.semibold,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
    },
  });
};
