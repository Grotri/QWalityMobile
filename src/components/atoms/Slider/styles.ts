import { getLineHeight } from "@/src/helpers/getFontSize";
import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    sliderWrapper: {
      width: "100%",
      position: "relative",
      marginBottom: 36,
    },
    slider: {
      width: "100%",
    },
    sliderTrack: {
      height: 7,
      borderRadius: 6,
    },
    sliderThumb: {
      boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
      width: 15,
      height: 15,
    },
    tooltipWrapper: {
      alignSelf: "flex-start",
      position: "absolute",
    },
    tooltipText: {
      color: palette.mainText,
      fontFamily: fonts.semibold,
      lineHeight: getLineHeight(20),
      width: "100%",
      textAlign: "center",
      position: "absolute",
      bottom: 2,
    },
  });
};
