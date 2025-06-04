import * as React from "react";
import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { IIcon } from "./types";
import { Pressable } from "react-native";
import { usePalette } from "../../src/hooks/usePalette";

const CrossIcon: FC<IIcon> = ({
  color,
  width = 14,
  height = 14,
  stroke = 3,
  style,
  onClick,
}) => {
  const palette = usePalette();

  return (
    <Pressable onPress={onClick} style={style}>
      <Svg width={width} height={height} fill="none" viewBox="0 0 14 14">
        <Path
          stroke={color || palette.mainText}
          strokeLinecap="round"
          strokeWidth={stroke}
          d="M2 11.88 11.88 2M2.04 2 12 11.96"
        />
      </Svg>
    </Pressable>
  );
};

export default CrossIcon;
