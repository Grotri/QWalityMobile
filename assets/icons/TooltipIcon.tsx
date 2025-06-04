import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IIcon } from "./types";
import { FC } from "react";
import { usePalette } from "../../src/hooks/usePalette";

const TooltipIcon: FC<IIcon> = ({ style }) => {
  const palette = usePalette();

  return (
    <Svg width={39} height={33} fill="none" viewBox="0 0 39 33" style={style}>
      <Path
        fill={palette.textFieldInFolderBg}
        d="M4 8h31a4 4 0 0 1 4 4v17a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4"
      />
      <Path
        fill={palette.textFieldInFolderBg}
        d="M18.645 1.41a1 1 0 0 1 1.71 0l7.318 12.072A1 1 0 0 1 26.818 15H12.182a1 1 0 0 1-.855-1.518z"
      />
    </Svg>
  );
};
export default TooltipIcon;
