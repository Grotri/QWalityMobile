import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, Text, View } from "react-native";
import { CheckIcon } from "../../../../assets/icons";
import useAccountStore from "../../../hooks/useAccountStore";
import useAuthStore from "../../../hooks/useAuthStore";
import { useAuthNavigation } from "../../../hooks/useTypedNavigation";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import InputPassword from "../../atoms/InputPassword";
import GradientPageTemplate from "../../templates/GradientPageTemplate";
import { styles } from "./styles";

const Registration = () => {
  const { navigate } = useAuthNavigation();
  const {
    errors,
    clearErrors,
    setErrorsField,
    user,
    setUserField,
    clearUser,
    register,
    sendRegisterCode,
  } = useAuthStore();
  const { addAccount } = useAccountStore();

  const [code, setCode] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    clearUser();
    setCode("");
    setIsChecked(false);
    clearErrors();
  }, []);

  return (
    <GradientPageTemplate
      headerText="Регистрация"
      onHeaderClick={() => navigate("Home", { direction: "backward" })}
      mustScroll={false}
    >
      <View style={styles.wrapper}>
        <View style={styles.fields}>
          <Input
            label="ИНН"
            value={user.inn || ""}
            onChangeText={(inn) => {
              setUserField("inn", inn);
              setErrorsField("inn", "");
            }}
            inputMode="numeric"
            maxLength={12}
            keyboardType="numeric"
            errorText={errors.inn}
          />
          <Input
            label="Почта"
            value={user.login}
            onChangeText={(email) => {
              setUserField("login", email);
              setErrorsField("login", "");
            }}
            inputMode="email"
            maxLength={254}
            errorText={errors.login}
          />
          <View style={styles.confirmationWrapper}>
            <Input
              label="Код подтверждения"
              value={code}
              onChangeText={(code) => {
                setCode(code);
                setErrorsField("code", "");
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
              onPress={() => sendRegisterCode(user.login.trim())}
            >
              <Text style={styles.codeBtnText}>Отправить код</Text>
            </Button>
          </View>
          <InputPassword
            label="Пароль"
            value={user.password}
            onChangeText={(password) => {
              setUserField("password", password);
              setErrorsField("password", "");
            }}
            errorText={errors.password}
          />
        </View>
        <Button
          color="welcomeBrightBlue"
          style={styles.createBtn}
          onPress={() => {
            Keyboard.dismiss();
            register(code, isChecked, addAccount);
          }}
        >
          <Text style={styles.createBtnText}>Создать аккаунт</Text>
        </Button>
        <View style={styles.checkboxWrapper}>
          <Pressable
            onPress={() => {
              setIsChecked(!isChecked);
              setErrorsField("agreement", "");
            }}
            style={styles.checkbox}
          >
            <View
              style={[
                styles.checkboxContainer,
                !!errors.agreement && styles.checkboxContainerError,
              ]}
            >
              {isChecked && <CheckIcon />}
            </View>
            <Text
              style={[
                styles.checkboxText,
                !!errors.agreement && styles.checkboxTextError,
              ]}
            >
              Я принимаю{" "}
              <Text style={styles.checkboxTextUnderlined}>
                условия пользовательского соглашения
              </Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </GradientPageTemplate>
  );
};

export default Registration;
