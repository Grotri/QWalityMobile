import * as React from "react";
import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { IIcon } from "./types";
import { usePalette } from "../../src/hooks/usePalette";

const HelpIcon: FC<IIcon> = ({
  color,
  style,
  width = 34,
  height = 34,
  stroke = 3,
}) => {
  const palette = usePalette();

  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 34 34"
      style={style}
    >
      <Path
        stroke={color || palette.white}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
        d="M12.877 12.75a4.25 4.25 0 0 1 8.26 1.417c0 2.833-4.25 4.25-4.25 4.25M17 24.083h.014M31.167 17c0 7.824-6.343 14.167-14.167 14.167S2.833 24.824 2.833 17 9.176 2.833 17 2.833 31.167 9.176 31.167 17"
      />
    </Svg>
  );
};

export default HelpIcon;
