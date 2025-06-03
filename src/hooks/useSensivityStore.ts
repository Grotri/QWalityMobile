import { create } from "zustand";
import {
  editSensivity as handleEditSensivity,
  getSensivity as handleGetSensivity,
} from "../api/client";
import { showErrorToast, showSuccessToast } from "../helpers/toast";
import i18n from "../i18n";

interface IUseSensivityStore {
  sensivity: number | null;
  getSensivity: () => void;
  editSensivity: (sensivity: number) => void;
  loading: boolean;
}

const useSensivityStore = create<IUseSensivityStore>((set) => ({
  sensivity: null,
  loading: false,

  getSensivity: async () => {
    try {
      set({ loading: true });
      const res = await handleGetSensivity();
      set({
        sensivity: res.data.sensitivity,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      set({ loading: false });
      showErrorToast(i18n.t("getSensivityError"));
    }
  },

  editSensivity: async (sensivity) => {
    try {
      await handleEditSensivity(sensivity);
      set({
        sensivity,
      });
      showSuccessToast(i18n.t("editSensivitySuccess"));
    } catch (error) {
      console.log(error);
      showErrorToast(i18n.t("editSensivityError"));
    }
  },
}));

export default useSensivityStore;
