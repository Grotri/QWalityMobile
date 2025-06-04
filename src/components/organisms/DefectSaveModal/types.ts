import { IDefect } from "../../pages/Main/types";

export interface IDefectSaveModal {
  onClose: () => void;
  defect: IDefect | null;
}
