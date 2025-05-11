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
import { IStoreStatus } from "../model/misc";
import { IErrors, initialErrors, initialUser, IUser } from "../model/user";

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
}

const useAuthStore = create<IUseAuthStore>((set, get) => ({
  loading: false,
  error: null,
  errors: { ...initialErrors },
  user: { ...initialUser },

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
          ? EErrors.required
          : !innPattern.test(inn.trim())
          ? EErrors.inn
          : "",
      login: !login.trim()
        ? EErrors.required
        : !emailPattern.test(login.trim())
        ? EErrors.email
        : "",
      code: !code.trim() ? EErrors.required : "",
      password: !password.trim()
        ? EErrors.required
        : password.trim().length < 8
        ? EErrors.password
        : "",
      agreement: !agreement ? EErrors.required : "",
    };

    set({ errors: newErrors });
    return Object.values(newErrors).every((error) => !error);
  },

  register: async (code, agreement, addAccount) => {
    const { user, validate } = get();

    if (!validate(code, agreement)) {
      showErrorToast(EErrors.fields);
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

        showSuccessToast("Вы успешно зарегистрировались!", 2000);
      } else {
        showErrorToast("Регистрация не удалась");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          showErrorToast("Ошибка: " + error.response.data.error);
        } else {
          showErrorToast("Произошла ошибка при регистрации");
        }
      } else {
        showErrorToast("Неизвестная ошибка");
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
      showSuccessToast("Вы успешно вошли в аккаунт!", 2000);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          showErrorToast("Ошибка: " + error.response.data.error);
        } else {
          showErrorToast("Произошла ошибка при входе в аккаунт");
        }
      } else {
        showErrorToast("Неизвестная ошибка");
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
        showSuccessToast("Код выслан на почту");
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            showErrorToast("Ошибка: " + error.response.data.error);
          } else {
            showErrorToast("Произошла ошибка при отправке кода");
          }
        } else {
          showErrorToast("Неизвестная ошибка");
        }
        set({ error });
      } finally {
        set({ loading: false });
      }
    } else {
      showErrorToast("Сначала введите почту");
    }
  },

  sendResetCode: async (email) => {
    if (email) {
      try {
        set({ loading: true, error: null });
        await resetPassword({ email });
        showSuccessToast("Код выслан на почту");
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            showErrorToast("Ошибка: " + error.response.data.error);
          } else {
            showErrorToast("Произошла ошибка при отправке кода");
          }
        } else {
          showErrorToast("Неизвестная ошибка");
        }
        set({ error });
      } finally {
        set({ loading: false });
      }
    } else {
      showErrorToast("Сначала введите почту");
    }
  },

  restorePassword: async (email, code, password, navigate) => {
    try {
      set({ loading: true, error: null });
      await confirmResetPassword({ email, code, new_password: password });
      navigate("Login", { direction: "backward" });
      showSuccessToast("Пароль сменен, зайдите с новыми данными", 5000);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          showErrorToast("Ошибка: " + error.response.data.error);
        } else {
          showErrorToast("Произошла ошибка при восстановлении пароля");
        }
      } else {
        showErrorToast("Неизвестная ошибка");
      }
      set({ error });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
