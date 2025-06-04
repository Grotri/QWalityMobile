import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    datePicker: {
      height: 27,
      borderRadius: 8,
      backgroundColor: palette.dateAndListSelectsPopupBg,
      alignItems: "center",
      justifyContent: "center",
    },
    date: {
      color: palette.mainText,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      fontFamily: fonts.semibold,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: palette.datePickerBg,
    },
    modalContent: {
      backgroundColor: "#fff",
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      position: "absolute",
      bottom: 0,
      width: "100%",
      padding: 0,
      margin: 0,
      alignItems: "center",
    },
  });
};
