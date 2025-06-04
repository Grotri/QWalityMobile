import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.gradientBlue,
    },
    scrollContainer: {
      flexGrow: 1,
    },
  });
};
