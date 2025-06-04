import * as React from "react";
import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { IIcon } from "./types";
import { usePalette } from "../../src/hooks/usePalette";

const TrashBinIcon: FC<IIcon> = ({
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
        d="M4.25 8.5h2.833m0 0H29.75m-22.667 0v19.833a2.833 2.833 0 0 0 2.834 2.834h14.166a2.833 2.833 0 0 0 2.834-2.834V8.5m-15.584 0V5.667a2.833 2.833 0 0 1 2.834-2.834h5.666a2.833 2.833 0 0 1 2.834 2.834V8.5"
      />
    </Svg>
  );
};

export default TrashBinIcon;
