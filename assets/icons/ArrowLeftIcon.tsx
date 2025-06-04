import * as React from "react";
import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { IIcon } from "./types";
import { Pressable } from "react-native";
import { usePalette } from "../../src/hooks/usePalette";

const ArrowLeftIcon: FC<IIcon> = ({
  color,
  style,
  onClick,
  width = 18,
  height = 26,
  stroke = 3,
}) => {
  const palette = usePalette();

  return (
    <Pressable
      onPress={onClick}
      style={[{ paddingHorizontal: 6, paddingVertical: 2 }, style]}
    >
      <Svg width={width} height={height} fill="none" viewBox="0 0 18 26">
        <Path
          stroke={color || palette.white}
          strokeLinecap="round"
          strokeWidth={stroke}
          d="M16 24 3.2 14.613a2 2 0 0 1 0 -3.226L16 2"
        />
      </Svg>
    </Pressable>
  );
};
export default ArrowLeftIcon;
