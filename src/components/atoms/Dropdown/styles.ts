import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    wrapper: {
      width: "100%",
      zIndex: 1,
    },
    label: {
      paddingLeft: 4,
      color: palette.subTextMainScreenPopup,
      fontFamily: fonts.regular,
    },
    dropdown: {
      backgroundColor: palette.dropdownBgTransparent,
      paddingHorizontal: 8,
      paddingVertical: 0,
      minHeight: 0,
      height: 36,
    },
    textStyle: {
      color: palette.mainText,
      lineHeight: getLineHeight(19),
      fontSize: getFontSize(14),
      fontFamily: fonts.regular,
    },
    item: {
      minHeight: 0,
      height: "auto",
      paddingHorizontal: 8,
      paddingVertical: 8,
      backgroundColor: palette.dropdownListBgTransparent,
    },
    selectedItem: {
      backgroundColor: palette.dropdownBgTransparent,
    },
  });
};
