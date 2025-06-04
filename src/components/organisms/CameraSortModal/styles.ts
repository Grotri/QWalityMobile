import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    modal: {
      width: "94%",
      borderRadius: 12,
      backgroundColor: palette.bgMainScreenPopup,
      padding: 12,
      alignItems: "center",
      gap: 16,
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
    content: {
      paddingHorizontal: 8,
      gap: 26,
    },
    dropdown: {
      backgroundColor: palette.subDropdownListBgTransparent,
      height: 27,
    },
    btns: {
      gap: 12,
    },
    btn: {
      borderRadius: 8,
      paddingVertical: 3,
    },
    btnText: {
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      fontFamily: fonts.semibold,
      color: palette.mainText,
    },
  });
};
