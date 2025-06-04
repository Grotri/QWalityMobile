import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IIcon } from "./types";
import { FC } from "react";
import { usePalette } from "../../src/hooks/usePalette";

const SolarPanelIcon: FC<IIcon> = ({ width = 139, color }) => {
  const palette = usePalette();
  const originalWidth = 139;
  const originalHeight = 147;
  const height = (width / originalWidth) * originalHeight;

  return (
    <Svg width={width} height={height} viewBox="0 0 139 147" fill="none">
      <Path
        stroke={color || palette.white}
        strokeLinecap="round"
        strokeWidth={4}
        d="m123.822 55.761-21.466 57.242a2 2 0 0 1-1.873 1.298h-86.04a2 2 0 0 1-1.872-2.702l25.978-69.275a2 2 0 0 1 1.872-1.297h86.04a2 2 0 0 1 1.873 2.702zm0 0 12.525 48.071a2 2 0 0 1-1.935 2.504h-15.207"
      />
      <Path
        stroke={color || palette.white}
        strokeLinecap="round"
        strokeWidth={4}
        d="m106.735 67.31 4.175-11.242a2 2 0 0 0-1.875-2.696H89.611m17.124 13.938H42.221m64.514 0-5.758 15.132M42.221 67.31l4.693-12.635a2 2 0 0 1 1.875-1.303h18.919M42.221 67.31l-5.91 15.132m0 0L30.513 97.65a2 2 0 0 0 1.87 2.713h18.202m-14.272-17.92h64.665m0 0-6.49 16.646a2 2 0 0 1-1.863 1.274H72.487M89.61 53.372l-17.124 46.991M89.61 53.372H67.708m4.779 46.991H50.584m17.124-46.991-17.124 46.991m8.363 13.938v9.947a2 2 0 0 1-2 2H16.743a2 2 0 0 0-2 2v8.345a2 2 0 0 0 2 2H76.47m0 0v-3.974a2 2 0 0 1 2-2h6.752a2 2 0 0 1 2 2v.39m-10.752 3.584v4.371a2 2 0 0 0 2 2h6.752a2 2 0 0 0 2-2v-.588m0-7.367h9.16m-9.16 0v7.367m0 0h9.16"
      />
      <Path
        stroke={color || palette.white}
        strokeLinejoin="round"
        strokeWidth={3}
        d="M53.608 22.678a23.1 23.1 0 0 1 3.261 9.98c.096 1.1-.809 1.997-1.913 1.997h-19.7a2 2 0 0 0-1.878 1.312l-6.78 18.497c-.38 1.037-1.533 1.577-2.534 1.109a23.099 23.099 0 1 1 29.544-32.895Z"
      />
      <Path
        stroke={color || palette.white}
        strokeLinecap="round"
        strokeWidth={3}
        d="m5.186 51.38 3.982-2.389M2 40.23l3.982-.796m0-11.151L2 27.487m7.169-9.557-3.187-2.39m11.151-5.575-2.39-3.186m11.947-.797L25.894 2m12.743 3.982L39.434 2m9.556 7.17 2.39-3.188m6.371 11.948 3.187-2.39"
      />
    </Svg>
  );
};

export default SolarPanelIcon;
