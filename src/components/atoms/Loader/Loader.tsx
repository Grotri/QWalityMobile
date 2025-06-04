import { usePalette } from "@/src/hooks/usePalette";
import React, { FC } from "react";
import { ActivityIndicator, Platform, View } from "react-native";

const Loader: FC<{ sizeIOS?: "small" | "large"; size?: number }> = ({
  sizeIOS = "large",
  size = 70,
}) => {
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
        size={Platform.OS === "ios" ? sizeIOS : size}
        color={palette.white}
      />
    </View>
  );
};

export default Loader;
