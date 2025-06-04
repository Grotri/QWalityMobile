import { usePalette } from "@/src/hooks/usePalette";
import { StyleSheet } from "react-native";

export const getStyles = () => {
  const palette = usePalette();

  return StyleSheet.create({
    container: {
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
      gap: 4,
    },
    bar: {
      width: 32,
      height: 4,
      backgroundColor: palette.mainText,
      borderRadius: 2,
    },
  });
};
