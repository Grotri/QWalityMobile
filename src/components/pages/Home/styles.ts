import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";
import { palette } from "../../../constants/palette";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 28,
  },
  waveWrapper: {
    position: "relative",
  },
  waveIcon: {
    zIndex: 0,
    position: "absolute",
    top: -4,
    right: -158,
  },
  solarIcon: {
    zIndex: 1,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 8,
    zIndex: 1,
  },
  headerTitle: {
    color: palette.welcomeScreenMainText,
    fontFamily: fonts.black,
    fontSize: getFontSize(22),
    lineHeight: getLineHeight(30),
    width: "66%",
  },
  line: {
    width: "30%",
    height: 3,
    backgroundColor: palette.white,
    opacity: 0.55,
    borderRadius: 50,
    marginBottom: 16,
    zIndex: 1,
  },
  welcomeText: {
    width: "88%",
    color: palette.welcomeScreenMainText,
    fontFamily: fonts.bold,
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(21),
    marginBottom: 16,
    zIndex: 1,
  },
  list: {
    gap: 20,
    marginBottom: 60,
  },
  btns: {
    alignItems: "center",
    gap: 16,
  },
  improveText: {
    textAlign: "center",
    width: "60%",
    color: palette.welcomeScreenImproveText,
    fontFamily: fonts.bold,
    fontSize: getFontSize(14),
    lineHeight: getLineHeight(19),
  },
  brightBlueBtn: {
    padding: 8,
    borderRadius: 14,
    width: "100%",
    minWidth: "70%",
  },
  brightBlueBtnText: {
    fontSize: getFontSize(20),
    lineHeight: getLineHeight(27),
    fontFamily: fonts.black,
    color: palette.welcomeScreenMainText,
  },
  blueBtn: {
    padding: 8,
    borderRadius: 14,
    minWidth: "60%",
  },
  blueBtnText: {
    fontSize: getFontSize(16),
    lineHeight: getLineHeight(22),
    fontFamily: fonts.black,
    color: palette.welcomeScreenSubText,
  },
});
