import { ICamera, IDefect } from "../../pages/Main/types";

export interface ICameraAccordion {
  sections: ICamera[];
  selectedCamera: ICamera | null;
  setSelectedCamera: (isOpen: ICamera | null) => void;
  isHistoryModalOpen: boolean | null;
  setIsHistoryModalOpen: (isOpen: boolean | null) => void;
  isSortCameraModalOpen: boolean;
  setIsSortCameraModalOpen: (isOpen: boolean) => void;
  isFilterCameraModalOpen: boolean;
  setIsFilterCameraModalOpen: (isOpen: boolean) => void;
  selectedDefect: IDefect | null;
  setSelectedDefect: (defect: IDefect | null) => void;
  isOnline: boolean;
}
