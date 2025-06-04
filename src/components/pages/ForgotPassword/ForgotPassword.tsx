import useAuthStore from "@/src/hooks/useAuthStore";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { EErrors } from "../../../constants/errors";
import { emailPattern } from "../../../constants/patterns";
import { showErrorToast } from "../../../helpers/toast";
import { useAuthNavigation } from "../../../hooks/useTypedNavigation";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import InputPassword from "../../atoms/InputPassword";
import GradientPageTemplate from "../../templates/GradientPageTemplate";
import { styles } from "./styles";
import { IErrors, initialErrors } from "./types";

const ForgotPassword = () => {
  const { navigate } = useAuthNavigation();
  const { t } = useTranslation();
  const { sendResetCode, restorePassword } = useAuthStore();
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<IErrors>({ ...initialErrors });

  const validate = (): boolean => {
    const newErrors: IErrors = {
      email: !email.trim()
        ? t(EErrors.required)
        : !emailPattern.test(email.trim())
        ? t(EErrors.email)
        : "",
      code: !code.trim() ? t(EErrors.required) : "",
      password: !password.trim()
        ? t(EErrors.required)
        : password.trim().length < 8
        ? t(EErrors.password)
        : "",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const changePassword = () => {
    if (validate()) {
      restorePassword(email.trim(), code.trim(), password.trim(), navigate);
    } else {
      showErrorToast(t(EErrors.fields));
    }
  };

  return (
    <GradientPageTemplate
      headerText={t("passwordRecovery")}
      onHeaderClick={() => navigate("Login", { direction: "backward" })}
      mustScroll={false}
      toggleLanguage
    >
      <View style={styles.wrapper}>
        <View style={styles.fields}>
          <Input
            label={t("email")}
            value={email}
            onChangeText={(email) => {
              setEmail(email);
              setErrors({ ...errors, email: "" });
            }}
            inputMode="email"
            maxLength={254}
            errorText={errors.email}
          />
          <View style={styles.confirmationWrapper}>
            <Input
              label={t("confirmationCode")}
              value={code}
              onChangeText={(code) => {
                setCode(code);
                setErrors({ ...errors, code: "" });
              }}
              inputMode="numeric"
              keyboardType="numeric"
              maxLength={6}
              customStyles={styles.confirmationInput}
              errorText={errors.code}
            />
            <Button
              style={styles.codeBtn}
              color="blueTransparent"
              onPress={() => sendResetCode(email.trim())}
            >
              <Text style={styles.codeBtnText}>{t("sendCode")}</Text>
            </Button>
          </View>
          <InputPassword
            label={t("newPassword")}
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
          style={styles.changeBtn}
          onPress={changePassword}
        >
          <Text style={styles.changeBtnText}>{t("changePassword")}</Text>
        </Button>
      </View>
    </GradientPageTemplate>
  );
};

export default ForgotPassword;
