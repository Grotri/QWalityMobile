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
  createBtn: {
    height: 34,
    borderRadius: 8,
    width: "84%",
    minWidth: "80%",
  },
  createBtnText: {
    color: palette.mainText,
    fontSize: getFontSize(18),
    lineHeight: getLineHeight(24),
    fontFamily: fonts.bold,
  },
  checkboxWrapper: {
    width: "100%",
    paddingRight: 12,
    paddingLeft: 12,
    marginTop: 20,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkboxContainer: {
    width: 18,
    height: 18,
    backgroundColor: palette.white,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxContainerError: {
    borderWidth: 1,
    borderColor: palette.error,
  },
  checkboxText: {
    color: palette.mainText,
    lineHeight: getLineHeight(19),
    flex: 1,
  },
  checkboxTextError: {
    color: palette.error,
  },
  checkboxTextUnderlined: {
    textDecorationLine: "underline",
  },
});
