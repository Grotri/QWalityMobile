import * as React from "react";
import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { IIcon } from "./types";
import { usePalette } from "../../src/hooks/usePalette";

const SortIcon: FC<IIcon> = ({
  color,
  style,
  width = 19,
  height = 19,
  stroke = 2,
}) => {
  const palette = usePalette();

  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 19 19"
      style={style}
    >
      <Path
        stroke={color || palette.white}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
        d="M14.25 15.833V7.917M9.5 15.833V3.167M4.75 15.833v-4.75"
      />
    </Svg>
  );
};

export default SortIcon;
