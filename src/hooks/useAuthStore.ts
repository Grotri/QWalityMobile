import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { create } from "zustand";
import {
  confirmResetPassword,
  loginRequest,
  registerRequest,
  resetPassword,
  sendCode,
} from "../api/auth";
import { forceLogout, initForceLogout } from "../api/forceLogout";
import { setRefresh, setToken } from "../api/token";
import { getUserInfo } from "../api/user";
import { EErrors } from "../constants/errors";
import { emailPattern, innPattern } from "../constants/patterns";
import { showErrorToast, showSuccessToast } from "../helpers/toast";
import i18n from "../i18n";
import { IStoreStatus } from "../model/misc";
import {
  IErrors,
  initialErrors,
  initialUser,
  IUser,
  TLanguage,
} from "../model/user";
import convertUserInfo from "../utils/convertUserInfo";

interface IUseAuthStore extends IStoreStatus {
  user: IUser;
  errors: IErrors;
  language: TLanguage;
  fetchUserInfo: (isWithTestSubs?: boolean) => Promise<void>;
  setLanguage: (lang: TLanguage) => void;
  setUserField: (field: keyof IUser, value: string) => void;
  setUser: (newUser: IUser) => void;
  clearUser: () => void;
  setErrorsField: (field: keyof IErrors, error: string) => void;
  clearErrors: () => void;
  validate: (code: string, agreement: boolean) => boolean;
  login: (login: string, password: string) => Promise<void>;
  register: (code: string, agreement: boolean) => Promise<void>;
  logout: (clearAccounts: () => void) => void;
  sendRegisterCode: (email: string) => void;
  sendResetCode: (email: string) => void;
  restorePassword: (
    email: string,
    code: string,
    password: string,
    navigate: any
  ) => void;
}

const useAuthStore = create<IUseAuthStore>((set, get) => {
  const clearUser = () => set({ user: { ...initialUser } });
  initForceLogout(clearUser);

  return {
    loading: false,
    error: null,
    errors: { ...initialErrors },
    user: { ...initialUser },
    language: "ru",

    fetchUserInfo: async (isWithTestSubs) => {
      try {
        set({ loading: true, error: null });
        const res = await getUserInfo();
        set({
          user: convertUserInfo(res.data, isWithTestSubs),
          loading: false,
          error: false,
        });
      } catch (error) {
        console.log(error);
        forceLogout();
        set({ error, loading: false });
      }
    },

    setUserField: (field, value) =>
      set((state) => {
        const updatedUser = { ...state.user, [field]: value };
        return { user: updatedUser };
      }),

    setUser: (newUser) => {
      set({ user: { ...newUser } });
    },

    clearUser: () => {
      set({ user: { ...initialUser } });
    },

    setErrorsField: (field, error) =>
      set((state) => ({ errors: { ...state.errors, [field]: error } })),

    clearErrors: () => set({ errors: { ...initialErrors } }),

    validate: (code, agreement) => {
      const { user } = get();
      const { inn, login, password } = user;

      const newErrors: IErrors = {
        inn:
          !inn || !inn.trim()
            ? i18n.t(EErrors.required)
            : !innPattern.test(inn.trim())
            ? i18n.t(EErrors.inn)
            : "",
        login: !login.trim()
          ? i18n.t(EErrors.required)
          : !emailPattern.test(login.trim())
          ? i18n.t(EErrors.email)
          : "",
        code: !code.trim() ? i18n.t(EErrors.required) : "",
        password: !password.trim()
          ? i18n.t(EErrors.required)
          : password.trim().length < 8
          ? i18n.t(EErrors.password)
          : "",
        agreement: !agreement ? i18n.t(EErrors.required) : "",
      };

      set({ errors: newErrors });
      return Object.values(newErrors).every((error) => !error);
    },

    register: async (code, agreement) => {
      const { user, validate, fetchUserInfo } = get();

      if (!validate(code, agreement)) {
        showErrorToast(i18n.t(EErrors.fields));
        return;
      }

      try {
        const response = await registerRequest({
          email: user.login.trim(),
          password: user.password.trim(),
          tin: user.inn?.trim() || "",
          type: "legal person",
          code: code.trim(),
        });

        if (response.status === 201) {
          const loginData = await loginRequest(
            user.login.trim(),
            user.password.trim()
          );
          const { access_token, refresh_token } = loginData.data;

          setToken(access_token);
          setRefresh(refresh_token);

          await fetchUserInfo(false);
          showSuccessToast(i18n.t("registrationSuccess"));
        } else {
          showErrorToast(i18n.t("registrationFailed"));
        }
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            showErrorToast(`${i18n.t("error")}: ` + error.response.data.error);
          } else {
            showErrorToast(i18n.t("registrationError"));
          }
        } else {
          showErrorToast(i18n.t("unknownError"));
        }
      }
    },

    login: async (login, password) => {
      try {
        const { fetchUserInfo } = get();
        const data = await loginRequest(login, password);
        const { access_token, refresh_token } = data.data;

        setToken(access_token);
        setRefresh(refresh_token);

        await fetchUserInfo(true);
        showSuccessToast(i18n.t("loginSuccess"));
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            showErrorToast(`${i18n.t("error")}: ` + error.response.data.error);
          } else {
            showErrorToast(i18n.t("loginError"));
          }
        } else {
          showErrorToast(i18n.t("unknownError"));
        }
      }
    },

    sendRegisterCode: async (email) => {
      if (email) {
        try {
          await sendCode({ email });
          showSuccessToast(i18n.t("codeSentToEmail"));
        } catch (error) {
          console.log(error);
          if (error instanceof AxiosError) {
            if (
              error.response &&
              error.response.data &&
              error.response.data.error
            ) {
              showErrorToast(
                `${i18n.t("error")}: ` + error.response.data.error
              );
            } else {
              showErrorToast(i18n.t("codeSendError"));
            }
          } else {
            showErrorToast(i18n.t("unknownError"));
          }
        }
      } else {
        showErrorToast(i18n.t("enterEmailFirst"));
      }
    },

    sendResetCode: async (email) => {
      if (email) {
        try {
          await resetPassword({ email });
          showSuccessToast(i18n.t("codeSentToEmail"));
        } catch (error) {
          console.log(error);
          if (error instanceof AxiosError) {
            if (
              error.response &&
              error.response.data &&
              error.response.data.error
            ) {
              showErrorToast(
                `${i18n.t("error")}: ` + error.response.data.error
              );
            } else {
              showErrorToast(i18n.t("codeSendError"));
            }
          } else {
            showErrorToast(i18n.t("unknownError"));
          }
        }
      } else {
        showErrorToast(i18n.t("enterEmailFirst"));
      }
    },

    restorePassword: async (email, code, password, navigate) => {
      try {
        await confirmResetPassword({ email, code, new_password: password });
        navigate("Login", { direction: "backward" });
        showSuccessToast(i18n.t("passwordChanged"), 5000);
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            showErrorToast(`${i18n.t("error")}: ` + error.response.data.error);
          } else {
            showErrorToast(i18n.t("passwordRecoveryError"));
          }
        } else {
          showErrorToast(i18n.t("unknownError"));
        }
      }
    },

    setLanguage: (lang) => {
      i18n.changeLanguage(lang);
      AsyncStorage.setItem("language", lang);
      set({ language: lang });
    },

    logout: (clearAccounts) => {
      forceLogout();
      clearAccounts();
    },
  };
});

export default useAuthStore;
