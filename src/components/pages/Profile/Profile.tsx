import { supportLink } from "@/src/constants/support";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Linking, Text, View } from "react-native";
import { ProfileIcon } from "../../../../assets/icons";
import { EErrors } from "../../../constants/errors";
import { emailPattern, innPattern } from "../../../constants/patterns";
import { ERoles } from "../../../constants/roles";
import { screenHeight } from "../../../constants/screenSize";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../../helpers/toast";
import useAuthStore from "../../../hooks/useAuthStore";
import { usePalette } from "../../../hooks/usePalette";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import { initialUser, IUser } from "../../../model/user";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import PageTemplate from "../../templates/PageTemplate";
import { getStyles } from "./styles";
import { IErrors, initialErrors } from "./types";

const Profile = () => {
  const { navigate } = useMainNavigation();
  const { t } = useTranslation();
  const { user, setUser } = useAuthStore();
  const styles = getStyles();
  const palette = usePalette();
  const [userInfo, setUserInfo] = useState<IUser>({ ...initialUser });
  const [errors, setErrors] = useState<IErrors>({ ...initialErrors });
  const [code, setCode] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const cancel = () => {
    setIsEditMode(false);
    setUserInfo({ ...user });
    setCode("");
    setErrors({ ...initialErrors });
  };

  const validate = (): boolean => {
    const newErrors: IErrors = {
      login: !userInfo.login.trim()
        ? t(EErrors.required)
        : !emailPattern.test(userInfo.login.trim())
        ? t(EErrors.email)
        : "",
      code: !code.trim() ? t(EErrors.required) : "",
      inn:
        !userInfo.inn || !userInfo.inn.trim()
          ? t(EErrors.required)
          : !innPattern.test(userInfo.inn.trim())
          ? t(EErrors.inn)
          : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const saveChanges = () => {
    const newProfile: IUser = {
      ...userInfo,
      login: userInfo.login.trim(),
      inn: userInfo.inn?.trim(),
    };
    if (JSON.stringify(user) !== JSON.stringify(newProfile)) {
      if (validate()) {
        setIsEditMode(false);
        setCode("");
        setUser(newProfile);
        showSuccessToast(t("profileDataChanged"));
      } else {
        showErrorToast(t(EErrors.fields));
      }
    } else {
      showInfoToast(t(EErrors.noChanges));
    }
  };

  useEffect(() => {
    setUserInfo({ ...user });
  }, [user]);

  return (
    <PageTemplate
      mustScroll={screenHeight < 700 && isEditMode}
      headerText={t("profile")}
      onHeaderClick={() => navigate("Main", { direction: "backward" })}
    >
      <View style={styles.profileWrapper}>
        <ProfileIcon />
        <View style={styles.card}>
          <View>
            <Text style={styles.cardPointTitle}>{t("emailOrLoginChange")}</Text>
            {!isEditMode ? (
              <Text style={styles.cardPointData}>{userInfo.login}</Text>
            ) : (
              <Input
                value={userInfo.login}
                onChangeText={(email) => {
                  setUserInfo({ ...userInfo, login: email });
                  setErrors({ ...errors, login: "" });
                }}
                customInputStyles={styles.input}
                inputMode="email"
                maxLength={254}
                cursorColor={palette.subTextMainScreenPopup}
                errorText={errors.login}
              />
            )}
          </View>
          <View>
            <Text style={styles.cardPointTitle}>{t("role")}</Text>
            <Text style={styles.cardPointData}>
              {t(ERoles[user.role as keyof typeof ERoles])}
            </Text>
          </View>
          {user.role === "owner" && (
            <View>
              <Text style={styles.cardPointTitle}>{t("inn")}</Text>
              {!isEditMode ? (
                <Text style={styles.cardPointData}>{userInfo.inn}</Text>
              ) : (
                <Input
                  value={userInfo.inn || ""}
                  onChangeText={(inn) => {
                    setUserInfo({ ...userInfo, inn });
                    setErrors({ ...errors, inn: "" });
                  }}
                  maxLength={12}
                  inputMode="numeric"
                  keyboardType="numeric"
                  customInputStyles={styles.input}
                  cursorColor={palette.subTextMainScreenPopup}
                  errorText={errors.inn}
                />
              )}
            </View>
          )}
        </View>
        {!isEditMode ? (
          <>
            {user.role === "owner" && (
              <Button
                style={[styles.btn, { marginTop: 13 }]}
                color="blue"
                onPress={() => setIsEditMode(true)}
              >
                <Text style={styles.btnText}>{t("editData")}</Text>
              </Button>
            )}
            {user.role === "owner" && (
              <Button
                style={styles.btn}
                color="blue"
                onPress={() => navigate("SubscriptionChange")}
              >
                <Text style={styles.btnText}>{t("manageSubscription")}</Text>
              </Button>
            )}
            {["owner", "administrator"].includes(user.role) && (
              <Button
                style={styles.btn}
                color="blue"
                onPress={() => navigate("Admin")}
              >
                <Text style={styles.btnText}>{t("adminPanel")}</Text>
              </Button>
            )}
          </>
        ) : (
          <>
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
                cursorColor={palette.subTextMainScreenPopup}
                customStyles={styles.confirmationInputWrapper}
                customInputStyles={styles.confirmationInput}
                customLabelStyles={styles.confirmationInputLabel}
                errorText={errors.code}
              />
              <Button style={styles.codeBtn} color="darkBlue">
                <Text style={styles.codeBtnText}>{t("sendCode")}</Text>
              </Button>
            </View>
            <Button style={styles.btn} color="blue" onPress={saveChanges}>
              <Text style={styles.btnText}>{t("saveChanges")}</Text>
            </Button>
            <Button style={styles.btn} color="blue" onPress={cancel}>
              <Text style={styles.btnText}>{t("cancelAction")}</Text>
            </Button>
            <View style={styles.supportTextWrapper}>
              <Text style={styles.supportText}>{t("noAccessToEmail")}</Text>
              <Button onPress={() => Linking.openURL(supportLink)}>
                <Text
                  style={[styles.supportText, styles.supportTextUnderlined]}
                >
                  {t("contactTechSupport")}
                </Text>
              </Button>
            </View>
          </>
        )}
      </View>
    </PageTemplate>
  );
};

export default Profile;
