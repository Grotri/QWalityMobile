import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IIcon } from "./types";
import { FC } from "react";
import { usePalette } from "../../src/hooks/usePalette";

const ProfileIconSmall: FC<IIcon> = ({ width = 36, height = 36, color }) => {
  const palette = usePalette();

  return (
    <Svg width={width} height={height} fill="none" viewBox="0 0 36 36">
      <Path
        stroke={color || palette.white}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M30 31.5v-3a6 6 0 0 0-6-6H12a6 6 0 0 0-6 6v3m18-21a6 6 0 1 1-12 0 6 6 0 0 1 12 0"
      />
    </Svg>
  );
};

export default ProfileIconSmall;
