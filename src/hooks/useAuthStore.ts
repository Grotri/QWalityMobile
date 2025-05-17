import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import uuid from "react-native-uuid";
import { create } from "zustand";
import {
  confirmResetPassword,
  loginRequest,
  registerRequest,
  resetPassword,
  sendCode,
} from "../api/auth";
import { forceLogout } from "../api/forceLogout";
import { setRefresh, setToken } from "../api/token";
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

interface IUseAuthStore extends IStoreStatus {
  user: IUser;
  setUserField: (field: keyof IUser, value: string) => void;
  setUser: (newUser: IUser) => void;
  clearUser: () => void;
  errors: IErrors;
  setErrorsField: (field: keyof IErrors, error: string) => void;
  clearErrors: () => void;
  register: (
    code: string,
    agreement: boolean,
    addAccount: (account: IUser) => void
  ) => void;
  validate: (code: string, agreement: boolean) => boolean;
  login: (
    email: string,
    password: string,
    addAccount: (account: IUser) => void
  ) => void;
  logout: (clearAccounts: () => void) => void;
  sendRegisterCode: (email: string) => void;
  sendResetCode: (email: string) => void;
  restorePassword: (
    email: string,
    code: string,
    password: string,
    navigate: any
  ) => void;
  language: TLanguage;
  setLanguage: (lang: TLanguage) => void;
}

const useAuthStore = create<IUseAuthStore>((set, get) => ({
  loading: false,
  error: null,
  errors: { ...initialErrors },
  user: { ...initialUser },
  language: "ru",

  clearUser: () => set({ user: { ...initialUser } }),

  setUser: (newUser) => {
    set({ user: { ...newUser } });
  },

  setUserField: (field, value) =>
    set((state) => ({
      user: { ...state.user, [field]: value },
    })),

  logout: (clearAccounts) => {
    forceLogout();
    clearAccounts();
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

  register: async (code, agreement, addAccount) => {
    const { user, validate } = get();

    if (!validate(code, agreement)) {
      showErrorToast(i18n.t(EErrors.fields));
      return;
    }

    set({ loading: true, error: null });

    try {
      const newUser: IUser = {
        id: uuid.v4(),
        login: user.login.trim(),
        password: user.password.trim(),
        inn: user.inn?.trim(),
        role: user.role,
        theme: "dark",
        fontSize: "default",
      };

      const response = await registerRequest({
        email: newUser.login,
        password: newUser.password,
        tin: newUser.inn || "",
        type: "legal person",
        code: code.trim(),
      });

      if (response.status === 201) {
        const loginData = await loginRequest(newUser.login, newUser.password);
        const { access_token, refresh_token } = loginData.data;

        await setToken(access_token);
        await setRefresh(refresh_token);
        await AsyncStorage.setItem("user", JSON.stringify(newUser));
        set({ user: newUser });
        addAccount(newUser);

        showSuccessToast(i18n.t("registrationSuccess"), 2000);
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
      set({ error });
    } finally {
      set({ loading: false });
    }
  },

  login: async (email, password, addAccount) => {
    set({ loading: true, error: null });

    try {
      const newUser: IUser = {
        id: uuid.v4(),
        login: email,
        password: password,
        inn: "1111111111",
        role: "owner",
        theme: "dark",
        fontSize: "default",
        subscription: "2",
      };

      const data = await loginRequest(email, password);
      const { access_token, refresh_token } = data.data;

      setToken(access_token);
      setRefresh(refresh_token);

      await AsyncStorage.setItem("user", JSON.stringify(newUser));
      set({ user: newUser });
      addAccount(newUser);
      showSuccessToast(i18n.t("loginSuccess"), 2000);
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
      set({ error });
    } finally {
      set({ loading: false });
    }
  },

  sendRegisterCode: async (email) => {
    if (email) {
      try {
        set({ loading: true, error: null });
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
            showErrorToast(`${i18n.t("error")}: ` + error.response.data.error);
          } else {
            showErrorToast(i18n.t("codeSendError"));
          }
        } else {
          showErrorToast(i18n.t("unknownError"));
        }
        set({ error });
      } finally {
        set({ loading: false });
      }
    } else {
      showErrorToast(i18n.t("enterEmailFirst"));
    }
  },

  sendResetCode: async (email) => {
    if (email) {
      try {
        set({ loading: true, error: null });
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
            showErrorToast(`${i18n.t("error")}: ` + error.response.data.error);
          } else {
            showErrorToast(i18n.t("codeSendError"));
          }
        } else {
          showErrorToast(i18n.t("unknownError"));
        }
        set({ error });
      } finally {
        set({ loading: false });
      }
    } else {
      showErrorToast(i18n.t("enterEmailFirst"));
    }
  },

  restorePassword: async (email, code, password, navigate) => {
    try {
      set({ loading: true, error: null });
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
      set({ error });
    } finally {
      set({ loading: false });
    }
  },

  setLanguage: (lang) => {
    i18n.changeLanguage(lang);
    AsyncStorage.setItem("language", lang);
    set({ language: lang });
  },
}));

export default useAuthStore;
