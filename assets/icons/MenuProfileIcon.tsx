import * as React from "react";
import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { IIcon } from "./types";
import { usePalette } from "../../src/hooks/usePalette";

const MenuProfileIcon: FC<IIcon> = ({
  color,
  width = 32,
  height = 32,
  stroke = 3,
  style,
}) => {
  const palette = usePalette();

  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 32 32"
      style={style}
    >
      <Path
        stroke={color || palette.white}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
        d="M24.167 25.375v-2.417a4.833 4.833 0 0 0-4.834-4.833H9.667a4.833 4.833 0 0 0-4.834 4.833v2.417m14.5-16.917a4.833 4.833 0 1 1-9.667 0 4.833 4.833 0 0 1 9.667 0"
      />
    </Svg>
  );
};

export default MenuProfileIcon;
