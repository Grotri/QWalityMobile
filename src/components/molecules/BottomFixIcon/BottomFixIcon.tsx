import { usePalette } from "@/src/hooks/usePalette";
import React from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Defs, Path, RadialGradient, Stop } from "react-native-svg";
import { getStyles } from "./styles";
import { IBottomFixIcon } from "./types";

const BottomFixIcon: React.FC<IBottomFixIcon> = ({
  icon,
  text,
  onPress,
  gap,
  marginRight,
}) => {
  const styles = getStyles();
  const palette = usePalette();
  const insets = useSafeAreaInsets();
  const bottomInset = Platform.OS === "android" ? insets.bottom + 4 : 28;

  return (
    <Pressable onPress={onPress} style={styles.wrapper}>
      <Svg
        width={130}
        height={130}
        fill="none"
        viewBox="0 0 130 130"
        style={styles.gradient}
      >
        <Path fill="url(#a)" d="M0 0h130v130H0z" />
        <Defs>
          <RadialGradient
            id="a"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="rotate(-128.908 62.313 22.426)scale(89.9569)"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset={0} stopColor={palette.bg} stopOpacity={1} />
            <Stop offset={1} stopColor={palette.bg} stopOpacity={0} />
          </RadialGradient>
        </Defs>
      </Svg>

      <View
        style={[styles.btn, { gap, marginRight, marginBottom: bottomInset }]}
      >
        <View style={styles.circle}>{icon}</View>
        <Text style={styles.btnText}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default BottomFixIcon;
