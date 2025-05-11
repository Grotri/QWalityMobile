import useAuthStore from "@/src/hooks/useAuthStore";
import React, { useState } from "react";
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
  const { sendResetCode, restorePassword } = useAuthStore();
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<IErrors>({ ...initialErrors });

  const validate = (): boolean => {
    const newErrors: IErrors = {
      email: !email.trim()
        ? EErrors.required
        : !emailPattern.test(email.trim())
        ? EErrors.email
        : "",
      code: !code.trim() ? EErrors.required : "",
      password: !password.trim()
        ? EErrors.required
        : password.trim().length < 8
        ? EErrors.password
        : "",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const changePassword = () => {
    if (validate()) {
      restorePassword(email.trim(), code.trim(), password.trim(), navigate);
    } else {
      showErrorToast(EErrors.fields);
    }
  };

  return (
    <GradientPageTemplate
      headerText="Восстановление пароля"
      onHeaderClick={() => navigate("Login", { direction: "backward" })}
      mustScroll={false}
    >
      <View style={styles.wrapper}>
        <View style={styles.fields}>
          <Input
            label="Почта"
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
              label="Код подтверждения"
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
              <Text style={styles.codeBtnText}>Отправить код</Text>
            </Button>
          </View>
          <InputPassword
            label="Новый пароль"
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
          <Text style={styles.changeBtnText}>Изменить пароль</Text>
        </Button>
      </View>
    </GradientPageTemplate>
  );
};

export default ForgotPassword;
