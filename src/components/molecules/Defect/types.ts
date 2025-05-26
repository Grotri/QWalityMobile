import { IDefect } from "../../pages/Main/types";

export interface IDefectItem {
  defect: IDefect;
  textBtn?: string;
  onPress?: () => void;
  setSelectedDefect?: (defect: IDefect) => void;
  pressableIcon?: boolean;
  isInTrashBin?: boolean;
}
