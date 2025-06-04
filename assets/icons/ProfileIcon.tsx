import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IIcon } from "./types";
import { FC } from "react";
import { usePalette } from "../../src/hooks/usePalette";

const ProfileIcon: FC<IIcon> = ({ width = 116, height = 116, color }) => {
  const palette = usePalette();

  return (
    <Svg width={width} height={height} fill="none" viewBox="0 0 116 116">
      <Path
        stroke={color || palette.white}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={6}
        d="M96.667 101.5v-9.667A19.333 19.333 0 0 0 77.333 72.5H38.667a19.333 19.333 0 0 0-19.334 19.333v9.667m58-67.667c0 10.678-8.656 19.334-19.333 19.334-10.678 0-19.333-8.656-19.333-19.334S47.322 14.5 58 14.5s19.333 8.656 19.333 19.333"
      />
    </Svg>
  );
};

export default ProfileIcon;
