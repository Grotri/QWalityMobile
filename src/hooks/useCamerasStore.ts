import { create } from "zustand";
import {
  changeCamera,
  createCamera,
  deleteCameraDefects,
  getCameras,
  moveCameraToTrash,
  permanentlyDeleteCameras,
  permanentlyDeleteCamerasByRange,
  restoreCameraFromTrash,
} from "../api/camera";
import {
  getDefects,
  moveDefectToTrash,
  permanentlyDeleteDefects,
  permanentlyDeleteDefectsByRange,
  restoreDefectFromTrash,
} from "../api/defects";
import { EErrors } from "../constants/errors";
import { linkPattern } from "../constants/patterns";
import { parseCustomDate } from "../helpers/formatDate";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../helpers/toast";
import i18n from "../i18n";
import { ICamera } from "../model/camera";
import { IStoreStatus } from "../model/misc";
import convertCamera from "../utils/convertCamera";
import convertCameras from "../utils/convertCameras";
import convertDefects, { DefectNode } from "../utils/convertDefects";

interface IErrors {
  name: string;
  link: string;
}

const initialErrors: IErrors = {
  name: "",
  link: "",
};

interface IUseCamerasStore extends IStoreStatus {
  cameras: ICamera[];
  errors: IErrors;
  activeSections: number[];
  setActiveSections: (sections: number[]) => void;
  setErrorsField: (field: keyof IErrors, error: string) => void;
  refreshErrors: () => void;
  fetchCameras: () => void;
  fetchDefects: () => void;
  validate: (name: string, link: string) => boolean;
  addCamera: (name: string, link: string) => void;
  editCamera: (camera: ICamera, onEdit: (camera: null) => void) => void;
  deleteCamera: (camera: ICamera) => void;
  recoverCamera: (cameraId: string) => void;
  deleteHistory: (cameraId: string) => void;
  deleteDefect: (cameraId: string, defectId: string) => void;
  recoverDefect: (cameraId: string, defectId: string) => void;
  clearTrashBin: (onClose: () => void) => void;
  clearTrashBinByDates: (
    startDate: Date | null,
    endDate: Date | null,
    onClose: () => void
  ) => void;
}

const useCamerasStore = create<IUseCamerasStore>((set, get) => ({
  loading: false,
  error: null,
  activeSections: [],
  cameras: [],
  errors: { ...initialErrors },

  fetchCameras: async () => {
    try {
      set({ loading: true, error: null });
      const resCameras = await getCameras();
      const resDefects = await getDefects();
      set({
        cameras: convertCameras(resCameras.data, resDefects.data),
        loading: false,
        error: false,
      });
    } catch (error) {
      showErrorToast(i18n.t("failedToLoadCameraList"));
      console.error(error);
      set({ error, loading: false });
    }
  },

  fetchDefects: async () => {
    try {
      const resDefects = await getDefects();
      set({ error: null });
      set((state) => ({
        cameras: state.cameras.map((camera) => {
          const defectNode = resDefects.data.find(
            (def: DefectNode) => def.camera_id.toString() === camera.id
          );
          return {
            ...camera,
            defects: defectNode ? convertDefects(defectNode) : camera.defects,
          };
        }),
        error: false,
      }));
    } catch (error) {
      console.error(error);
      set({ error });
    }
  },

  setActiveSections: (sections) => set({ activeSections: sections }),

  setErrorsField: (field, error) =>
    set((state) => ({ errors: { ...state.errors, [field]: error } })),

  validate: (name, link) => {
    const newErrors: IErrors = {
      name: !name.trim() ? i18n.t(EErrors.required) : "",
      link: !link.trim()
        ? i18n.t(EErrors.required)
        : !linkPattern.test(link.trim())
        ? i18n.t(EErrors.link)
        : "",
    };

    set({ errors: newErrors });
    return Object.values(newErrors).every((error) => !error);
  },

  addCamera: async (name, link) => {
    const { validate, cameras } = get();

    if (validate(name, link)) {
      try {
        set({ error: null });
        const request = await createCamera({
          name: name.trim(),
          camera_url: link.trim(),
        });
        set({
          cameras: [...cameras, convertCamera(request.data, link.trim())],
          error: false,
        });
        showSuccessToast(
          `${i18n.t("camera")} "${name}" ${i18n.t("cameraAddedSuccessfully")}`
        );
      } catch (error) {
        showErrorToast(i18n.t("cameraAddError"));
        console.log(error);
        set({ error });
      }
    } else {
      showErrorToast(i18n.t(EErrors.fields));
    }
  },

  editCamera: async (camera, onEdit) => {
    const { validate, cameras } = get();
    const oldCamera = cameras.find((c) => c.id === camera.id);
    const newCamera: ICamera = {
      ...camera,
      title: camera.title.trim(),
      link: camera.link.trim(),
    };

    if (JSON.stringify(oldCamera) !== JSON.stringify(newCamera)) {
      if (validate(newCamera.title, newCamera.link)) {
        try {
          set({ loading: true, error: null });
          // await changeCamera(newCamera.id, {
          //   name: newCamera.title,
          //   camera_url: newCamera.link,
          //   status: newCamera.online ? "active" : "non-active",
          // });
          set({
            cameras: cameras.map((c) =>
              c.id === newCamera.id ? newCamera : c
            ),
            loading: false,
            error: false,
          });
          onEdit(null);
          showSuccessToast(i18n.t("cameraDataEditedSuccessfully"));
        } catch (error) {
          showErrorToast(i18n.t("cameraEditError"));
          console.log(error);
          set({ loading: false, error });
        }
      } else {
        showErrorToast(i18n.t(EErrors.fields));
      }
    } else {
      showInfoToast(i18n.t(EErrors.noChanges));
    }
  },

  deleteCamera: (camera) => {
    const { cameras } = get();
    const now = convertISODate(new Date().toISOString());

    try {
      set({ loading: true, error: null });
      // TODO: поле "deleted" не забыть отправить на бэк
      set({
        cameras: cameras.map((c) =>
          c.id === camera.id ? { ...c, deletedAt: now } : c
        ),
        errors: { ...initialErrors },
        loading: false,
        error: false,
      });
      showSuccessToast(
        `${i18n.t("camera")} "${camera.title}" ${i18n.t("cameraMovedToTrash")}`
      );
    } catch (error) {
      showErrorToast(i18n.t("failedToDeleteCamera"));
      console.error(error);
      set({ error, loading: false });
    }
  },

  recoverCamera: (cameraId: string) => {
    const { cameras } = get();
    set({
      cameras: cameras.map((c) =>
        c.id === cameraId ? { ...c, deletedAt: undefined } : c
      ),
    });
    showSuccessToast(i18n.t("cameraRestored"));
  },

  deleteHistory: (id) => {
    const { cameras } = get();
    try {
      set({ loading: true, error: null });
      set({
        cameras: cameras.map((camera: ICamera) =>
          camera.id === id
            ? { ...camera, defects: camera.defects.filter((d) => d.deletedAt) }
            : camera
        ),
        errors: { ...initialErrors },
        loading: false,
        error: false,
      });
      showSuccessToast(i18n.t("cameraHistoryDeleted"));
    } catch (error) {
      showErrorToast(i18n.t("failedToDeleteCameraHistory"));
      console.error(error);
      set({ error, loading: false });
    }
  },

  deleteDefect: async (cameraId, defectId) => {
    const { cameras } = get();
    try {
      const requestRes = await moveDefectToTrash(defectId);
      set({
        cameras: cameras.map((c) =>
          c.id === cameraId
            ? {
                ...c,
                defects: c.defects.map((d) =>
                  d.id === defectId
                    ? { ...d, deletedAt: requestRes.data.deleted_at }
                    : d
                ),
              }
            : c
        ),
      });
      showSuccessToast(i18n.t("defectMovedToTrash"));
    } catch (error) {
      showErrorToast(i18n.t("failedToDeleteDefect"));
      console.error(error);
    }
  },

  recoverDefect: async (cameraId, defectId) => {
    const { cameras } = get();
    try {
      await restoreDefectFromTrash(defectId);
      set({
        cameras: cameras.map((c) =>
          c.id === cameraId
            ? {
                ...c,
                defects: c.defects.map((d) =>
                  d.id === defectId ? { ...d, deletedAt: undefined } : d
                ),
              }
            : c
        ),
      });
      showSuccessToast(i18n.t("defectRecovered"));
    } catch (error) {
      showErrorToast(i18n.t("failedToRestoreDefect"));
      console.error(error);
    }
  },

  clearTrashBin: async (onClose) => {
    const { cameras } = get();
    try {
      set({ loading: true, error: null });
      await permanentlyDeleteDefects();
      await permanentlyDeleteCameras();
      set({
        cameras: cameras
          .filter((camera) => !camera.deletedAt)
          .map((camera) => ({
            ...camera,
            defects: camera.defects.filter((defect) => !defect.deletedAt),
        })),
        loading: false,
        error: false,
      });
      
      onClose();
      showSuccessToast(i18n.t("trashCleared"));
    } catch (error) {
      showErrorToast(i18n.t("failedToClearTrash"));
      console.error(error);
      set({ error, loading: false });
    }
  },

  clearTrashBinByDates: async (startDate, endDate, onClose) => {
    const { cameras } = get();

    if (!startDate || !endDate) {
      showErrorToast(i18n.t(EErrors.chooseDates));
      return;
    }

    if (startDate > endDate) {
      showErrorToast(i18n.t(EErrors.timeDates));
      return;
    }

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    try {
      set({ error: null });

      let foundSomething = false;

      const filteredCameras = cameras
        .map((camera) => {
          const filteredDefects = camera.defects.filter((defect) => {
          if (!defect.deletedAt) return true;

          const defectTimestamp = parseCustomDate(defect.deletedAt);
          const shouldDelete =
            defectTimestamp >= start.getTime() &&
            defectTimestamp <= end.getTime();

          if (shouldDelete) {
            foundSomething = true;
            return false;
          }

          return true;
          });

          return {
            ...camera,
            defects: filteredDefects,
          };
        })
        .filter((camera) => {
          if (!camera.deletedAt) return true;

          const deletedTimestamp = parseCustomDate(camera.deletedAt);
          const shouldDelete =
            deletedTimestamp >= start.getTime() &&
            deletedTimestamp <= end.getTime();

          if (shouldDelete) {
            foundSomething = true;
            return false;
          }

          return true;
        });

      if (!foundSomething) {
        showInfoToast(i18n.t("noDefectsFoundInPeriod"));
        return;
      }

      await permanentlyDeleteCamerasByRange({
        start_date: start.toISOString(),
        end_date: end.toISOString(),
      });
      await permanentlyDeleteDefectsByRange({
        start_date: start.toISOString(),
        end_date: end.toISOString(),
      });

      set({
        cameras: filteredCameras,
        error: false,
      });

      onClose();
      showSuccessToast(i18n.t("trashClearedForPeriod"));
    } catch (error) {
      showErrorToast(i18n.t("failedToClearTrashForPeriod"));
      console.error(error);
      set({ error });
    }
  },

  refreshErrors: () => {
    set({ errors: { ...initialErrors } });
  },
}));

export default useCamerasStore;
