import { ICamera } from "@/src/model/camera";

export interface ICameraItem {
  camera: ICamera;
  onPress: () => void;
}
