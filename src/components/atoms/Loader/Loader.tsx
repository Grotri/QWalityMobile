import { usePalette } from "@/src/hooks/usePalette";
import React from "react";
import { ActivityIndicator, Platform, View } from "react-native";

const Loader = () => {
  const palette = usePalette();

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator
        size={Platform.OS === "ios" ? "large" : 70}
        color={palette.white}
      />
    </View>
  );
};

export default Loader;
