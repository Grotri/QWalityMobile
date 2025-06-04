import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";
import { palette } from "../../../constants/palette";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 28,
    marginTop: 8,
    alignItems: "center",
  },
  fields: {
    paddingBottom: 52,
    paddingHorizontal: 12,
    gap: 12,
    width: "100%",
  },
  loginBtn: {
    height: 34,
    borderRadius: 8,
    width: "84%",
    minWidth: "80%",
    marginBottom: 12,
  },
  loginBtnText: {
    color: palette.mainText,
    fontSize: getFontSize(18),
    lineHeight: getLineHeight(24),
    fontFamily: fonts.bold,
  },
  textUnderlined: {
    color: palette.mainText,
    textDecorationLine: "underline",
  },
});
