import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.bg,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    bottomIcon: {
      position: "absolute",
      right: 0,
      bottom: 0,
      width: 130,
      height: 130,
      justifyContent: "center",
    },
    bottomIconContainer: {
      height: 128,
    },
    fixBackground: {
      backgroundColor: palette.blue2,
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      zIndex: 1000,
    },
  });
};
