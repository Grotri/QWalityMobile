import * as React from "react";
import { FC } from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";
import { IIcon } from "./types";
import { usePalette } from "../../src/hooks/usePalette";

const SettingsIcon: FC<IIcon> = ({
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
      <G
        stroke={color || palette.white}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stroke}
        clipPath="url(#a)"
      >
        <Path d="M17 21.25a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5" />
        <Path d="M27.483 21.25a2.34 2.34 0 0 0 .468 2.578l.085.085a2.834 2.834 0 1 1-4.01 4.01l-.084-.085a2.34 2.34 0 0 0-2.579-.468 2.34 2.34 0 0 0-1.416 2.14v.24a2.833 2.833 0 0 1-5.667 0v-.127a2.34 2.34 0 0 0-1.53-2.14 2.34 2.34 0 0 0-2.578.468l-.085.085a2.833 2.833 0 0 1-4.84-2.005 2.83 2.83 0 0 1 .83-2.004l.086-.085a2.34 2.34 0 0 0 .467-2.579 2.34 2.34 0 0 0-2.14-1.416h-.24a2.834 2.834 0 0 1 0-5.667h.128a2.34 2.34 0 0 0 2.139-1.53 2.34 2.34 0 0 0-.468-2.578l-.085-.085a2.832 2.832 0 0 1 .92-4.624 2.83 2.83 0 0 1 3.09.615l.084.085a2.34 2.34 0 0 0 2.579.467h.113a2.34 2.34 0 0 0 1.417-2.14v-.24a2.834 2.834 0 0 1 5.666 0v.128a2.34 2.34 0 0 0 1.417 2.139 2.34 2.34 0 0 0 2.578-.468l.085-.085a2.833 2.833 0 0 1 4.84 2.005 2.83 2.83 0 0 1-.83 2.004l-.085.085a2.34 2.34 0 0 0-.468 2.579v.113a2.34 2.34 0 0 0 2.14 1.417h.24a2.833 2.833 0 0 1 0 5.666h-.127a2.34 2.34 0 0 0-2.14 1.417" />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill={color || palette.white} d="M0 0h34v34H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default SettingsIcon;
