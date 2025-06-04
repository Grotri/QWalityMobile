import { FC } from "react";
import { IIcon } from "../../../../assets/icons/types";

export interface IMenuItem {
  index: number;
  icon: FC<IIcon>;
  title: string;
  isRoundBorder?: boolean;
  isExpanded: boolean;
  onPress: () => void;
}
