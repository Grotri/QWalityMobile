import Toast, { ToastType } from "react-native-toast-message";

const showToast = (type: ToastType, message: string, duration = 1400) => {
  Toast.show({
    type,
    text1: message,
    visibilityTime: duration,
    autoHide: true,
  });
};

export const showSuccessToast = (msg: string, duration?: number) =>
  showToast("success", msg, duration);

export const showErrorToast = (msg: string, duration?: number) =>
  showToast("error", msg, duration);

export const showInfoToast = (msg: string, duration?: number) =>
  showToast("info", msg, duration);
