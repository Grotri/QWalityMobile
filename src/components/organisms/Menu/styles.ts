import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    wrapper: {
      width: "100%",
      zIndex: 100,
      backgroundColor: palette.blue2,
    },
    header: {
      zIndex: 100,
      height: 73,
      width: "100%",
      backgroundColor: palette.blue2,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
    },
    headerBtn: {
      alignItems: "center",
      gap: 2,
      minWidth: 52,
    },
    headerBtnTxt: {
      fontSize: getFontSize(12),
      lineHeight: getLineHeight(16),
      color: palette.mainText,
    },
  });
};
