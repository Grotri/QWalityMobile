import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: "#00000000",
  },
  absoluteIOS: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
