import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    card: {
      justifyContent: "space-between",
      gap: 20,
      backgroundColor: palette.subscriptionCardBg,
      borderRadius: 15,
      paddingHorizontal: "12%",
      marginHorizontal: "10%",
      height: "100%",
    },
    topView: {
      width: "100%",
      alignItems: "center",
    },
    title: {
      color: palette.mainText,
      fontSize: getFontSize(28),
      lineHeight: getLineHeight(37),
      fontFamily: fonts.bold,
      marginBottom: 10,
    },
    line: {
      width: "75%",
      height: 3,
      backgroundColor: palette.brightBlueTransparent,
      borderRadius: 50,
      marginBottom: 16,
    },
    description: {
      color: palette.mainText,
      fontFamily: fonts.semibold,
      width: "100%",
      textAlign: "center",
    },
    radios: {
      width: "100%",
      alignItems: "flex-start",
    },
    radio: {
      flex: 0,
    },
    bottomView: {
      width: "100%",
      alignItems: "center",
    },
    price: {
      color: palette.welcomeScreenImproveText,
      fontSize: getFontSize(16),
      lineHeight: getLineHeight(21),
      fontFamily: fonts.bold,
      marginBottom: 8,
    },
    btn: {
      borderRadius: 8,
      height: 31,
      width: "100%",
      alignItems: "center",
      textAlign: "center",
      justifyContent: "center",
    },
    btnText: {
      color: palette.mainText,
      fontSize: getFontSize(18),
      lineHeight: getLineHeight(24),
      fontFamily: fonts.bold,
    },
  });
};
