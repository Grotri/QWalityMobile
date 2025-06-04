import * as React from "react";
import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { IIcon } from "./types";
import { usePalette } from "../../src/hooks/usePalette";

const MessageIcon: FC<IIcon> = ({
  color,
  style,
  width = 36,
  height = 36,
  stroke = 3,
}) => {
  const palette = usePalette();

  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 36 36"
      style={style}
    >
      <Path
        stroke={color || palette.white}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
        d="M31.5 22.5a3 3 0 0 1-3 3h-18l-6 6v-24a3 3 0 0 1 3-3h21a3 3 0 0 1 3 3z"
      />
    </Svg>
  );
};

export default MessageIcon;
