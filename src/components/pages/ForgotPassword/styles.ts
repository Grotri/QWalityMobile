import { getFontSize, getLineHeight } from "@/src/helpers/getFontSize";
import { StyleSheet } from "react-native";
import { fonts } from "../../../constants/fonts";
import { palette } from "../../../constants/palette";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 8,
    paddingHorizontal: 28,
    alignItems: "center",
  },
  fields: {
    paddingBottom: 52,
    paddingHorizontal: 12,
    gap: 12,
    width: "100%",
  },
  confirmationWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  confirmationInput: {
    width: "50%",
    flex: 1,
  },
  codeBtn: {
    height: 30,
    width: "50%",
    flex: 1,
    borderRadius: 8,
    marginTop: 21,
  },
  codeBtnText: {
    color: palette.mainText,
    lineHeight: getLineHeight(19),
  },
  changeBtn: {
    height: 34,
    borderRadius: 8,
    width: "84%",
    minWidth: "80%",
    marginBottom: 12,
  },
  changeBtnText: {
    color: palette.mainText,
    fontSize: getFontSize(18),
    lineHeight: getLineHeight(24),
    fontFamily: fonts.bold,
  },
});
