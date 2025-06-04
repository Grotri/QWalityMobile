import * as React from "react";
import { IIcon } from "./types";
import { FC } from "react";
import ArrowLeftIcon from "./ArrowLeftIcon";

const ArrowRightIcon: FC<IIcon> = ({ color, style, onClick }) => (
  <ArrowLeftIcon
    color={color}
    style={[{ transform: [{ scaleX: -1 }] }, style]}
    onClick={onClick}
  />
);

export default ArrowRightIcon;
