import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { EErrors } from "../../../constants/errors";
import { showErrorToast } from "../../../helpers/toast";
import useAccountStore from "../../../hooks/useAccountStore";
import useAuthStore from "../../../hooks/useAuthStore";
import { useAuthNavigation } from "../../../hooks/useTypedNavigation";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import InputPassword from "../../atoms/InputPassword";
import GradientPageTemplate from "../../templates/GradientPageTemplate";
import { styles } from "./styles";
import { IErrors, initialErrors } from "./types";

const Login = () => {
  const { t } = useTranslation();
  const { navigate } = useAuthNavigation();
  const { login } = useAuthStore();
  const { addAccount } = useAccountStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<IErrors>({ ...initialErrors });

  const validate = (): boolean => {
    const newErrors: IErrors = {
      email: !email.trim() ? t(EErrors.required) : "",
      password: !password.trim()
        ? t(EErrors.required)
        : password.trim().length < 8
        ? t(EErrors.password)
        : "",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleLogin = () => {
    if (validate()) {
      login(email.trim(), password.trim(), addAccount);
    } else {
      showErrorToast(t(EErrors.fields));
    }
  };

  return (
    <GradientPageTemplate
      headerText={t("signInAccount")}
      onHeaderClick={() => navigate("Home", { direction: "backward" })}
      mustScroll={false}
      toggleLanguage
    >
      <View style={styles.wrapper}>
        <View style={styles.fields}>
          <Input
            label={t("emailOrLogin")}
            value={email}
            onChangeText={(email) => {
              setEmail(email);
              setErrors({ ...errors, email: "" });
            }}
            inputMode="email"
            maxLength={254}
            errorText={errors.email}
          />
          <InputPassword
            label={t("password")}
            value={password}
            onChangeText={(password) => {
              setPassword(password);
              setErrors({ ...errors, password: "" });
            }}
            errorText={errors.password}
          />
        </View>
        <Button
          color="welcomeBrightBlue"
          style={styles.loginBtn}
          onPress={handleLogin}
        >
          <Text style={styles.loginBtnText}>{t("signIn")}</Text>
        </Button>
        <Button onPress={() => navigate("ForgotPassword")}>
          <Text style={styles.textUnderlined}>{t("forgotPassword")}</Text>
        </Button>
      </View>
    </GradientPageTemplate>
  );
};

export default Login;
