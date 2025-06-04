import { FC } from "react";
import { IIcon } from "../../../../assets/icons/types";
import { TypeMainStackParamList } from "../../../navigation";

export interface IMenu {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}

export interface IMenuItem {
  icon: FC<IIcon>;
  title: string;
  path: keyof TypeMainStackParamList;
}
