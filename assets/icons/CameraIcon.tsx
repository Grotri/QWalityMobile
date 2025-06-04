import * as React from "react";
import { FC } from "react";
import Svg, { Path } from "react-native-svg";
import { IIcon } from "./types";
import { usePalette } from "../../src/hooks/usePalette";

const CameraIcon: FC<IIcon> = ({
  color,
  width = 29,
  height = 29,
  stroke = 2,
  style,
}) => {
  const palette = usePalette();

  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 29 29"
      style={style}
    >
      <Path
        stroke={color || palette.mainText}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
        d="M27.792 22.958a2.417 2.417 0 0 1-2.417 2.417H3.625a2.417 2.417 0 0 1-2.417-2.417V9.667A2.417 2.417 0 0 1 3.625 7.25h4.833l2.417-3.625h7.25l2.417 3.625h4.833a2.417 2.417 0 0 1 2.417 2.417z"
      />
      <Path
        stroke={color || palette.mainText}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
        d="M14.5 20.542a4.833 4.833 0 1 0 0-9.667 4.833 4.833 0 0 0 0 9.667"
      />
    </Svg>
  );
};

export default CameraIcon;
