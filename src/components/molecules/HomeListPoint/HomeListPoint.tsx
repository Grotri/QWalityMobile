import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { Text, View } from "react-native";
import { usePalette } from "../../../hooks/usePalette";
import { getStyles } from "./styles";
import { IHomeListPoint } from "./types";

const HomeListPoint: FC<IHomeListPoint> = ({ text }) => {
  const styles = getStyles();
  const palette = usePalette();

  return (
    <LinearGradient
      colors={[
        palette.welcomeScreenGradientDark,
        palette.welcomeScreenGradientLight,
      ]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      locations={[0.6356, 1]}
      style={styles.listPoint}
    >
      <View style={styles.listPointCircle}></View>
      <Text style={styles.listPointText}>{text}</Text>
    </LinearGradient>
  );
};

export default HomeListPoint;
