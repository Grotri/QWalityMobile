import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    itemWrapper: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 20,
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    image: {
      width: 36,
      height: 36,
      borderRadius: 8,
      backgroundColor: palette.trashItemImageBg,
      alignItems: "center",
      justifyContent: "center",
    },
    imageText: {
      color: palette.mainText,
    },
    itemName: {
      color: palette.mainText,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      fontFamily: fonts.semibold,
    },
    itemDate: {
      color: palette.mainText,
    },
    btnText: {
      color: palette.mainText,
      textDecorationLine: "underline",
    },
  });
};
