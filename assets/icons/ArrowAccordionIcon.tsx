import * as React from "react";
import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { IIcon } from "./types";
import { usePalette } from "../../src/hooks/usePalette";

const ArrowAccordionIcon: FC<IIcon> = ({
  color,
  style,
  width = 26,
  height = 17,
  stroke = 3,
}) => {
  const palette = usePalette();

  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 26 17"
      style={style}
    >
      <Path
        stroke={color || palette.white}
        strokeLinecap="round"
        strokeWidth={stroke}
        d="M2 1.5l9.387 12.8a2 2 0 0 0 3.226 0L24 1.5"
      />
    </Svg>
  );
};

export default ArrowAccordionIcon;
