import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { ArrowBottomIcon } from "../../../../assets/icons";
import { EErrors } from "../../../constants/errors";
import { ERoles } from "../../../constants/roles";
import { screenHeight } from "../../../constants/screenSize";
import { showErrorToast } from "../../../helpers/toast";
import { useAccountLimits } from "../../../helpers/useAccountLimits";
import { useAvailableRoles } from "../../../helpers/useAvailableRoles";
import useAccountStore from "../../../hooks/useAccountStore";
import { usePalette } from "../../../hooks/usePalette";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import Button from "../../atoms/Button";
import Dropdown from "../../atoms/Dropdown";
import Input from "../../atoms/Input";
import InputPassword from "../../atoms/InputPassword";
import Slider from "../../atoms/Slider";
import GetReportModal from "../../organisms/GetReportModal";
import PageTemplate from "../../templates/PageTemplate";
import { getStyles } from "./styles";
import { IErrors, initialErrors } from "./types";

const Admin = () => {
  const { navigate } = useMainNavigation();
  const { t } = useTranslation();
  const styles = getStyles();
  const palette = usePalette();
  const { accounts, registerAccount } = useAccountStore();
  const availableRoles = useAvailableRoles();
  const accountLimits = useAccountLimits();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<IErrors>({ ...initialErrors });
  const [role, setRole] = useState<string>("user");
  const [isMainModalOpened, setIsMainModalOpened] = useState<boolean>(false);
  const [isRoleDdOpen, setIsRoleDdOpen] = useState<boolean>(false);

  const closeDropdowns = () => {
    if (isRoleDdOpen) {
      setIsRoleDdOpen(false);
    }
  };

  const validate = (): boolean => {
    const newErrors: IErrors = {
      login: !login.trim() ? t(EErrors.required) : "",
      password: !password.trim()
        ? t(EErrors.required)
        : password.trim().length < 8
        ? t(EErrors.password)
        : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const createSubAccount = () => {
    if (accounts.length < accountLimits) {
      if (validate()) {
        registerAccount(login.trim(), password.trim(), role);
        setLogin("");
        setPassword("");
      } else {
        showErrorToast(t(EErrors.fields));
      }
    } else {
      showErrorToast(t("accountsLimitReached"));
    }
  };

  return (
    <PageTemplate
      mustScroll={screenHeight < 740}
      onTouchablePress={closeDropdowns}
      headerText={t("adminPanel")}
      underlined
      onHeaderClick={() => navigate("Profile", { direction: "backward" })}
      isWholeBlurOn={isMainModalOpened}
    >
      <View>
        <View style={styles.adminWrapper}>
          <Text style={styles.subTitle}>{t("networkConfidence")}</Text>
          <Slider />
          <Text style={styles.subTitle}>{t("subAccountRegistration")}</Text>
          <Input
            label={t("login")}
            value={login}
            onChangeText={(login) => {
              setLogin(login);
              setErrors({ ...errors, login: "" });
            }}
            errorText={errors.login}
            inputMode="email"
            maxLength={254}
            cursorColor={palette.subTextMainScreenPopup}
            customStyles={styles.confirmationInputWrapper}
            customInputStyles={styles.confirmationInput}
            customLabelStyles={styles.confirmationInputLabel}
          />
          <InputPassword
            label={t("password")}
            value={password}
            onChangeText={(password) => {
              setPassword(password);
              setErrors({ ...errors, password: "" });
            }}
            errorText={errors.password}
            cursorColor={palette.subTextMainScreenPopup}
            customStyles={styles.confirmationInputWrapper}
            customInputStyles={styles.confirmationInput}
            customLabelStyles={styles.confirmationInputLabel}
            iconColor={palette.mainText}
          />
          <Dropdown
            data={availableRoles.map((key) => ({
              value: key,
              label: t(ERoles[key as keyof typeof ERoles]),
            }))}
            value={role}
            setValue={setRole}
            label={t("role")}
            wrapperStyle={styles.dropdownWrapper}
            labelStyle={styles.dropdownLabelStyle}
            dropdownStyle={styles.dropdownMainStyle}
            selectedTextStyle={styles.selectedMainTextStyle}
            isOpen={isRoleDdOpen}
            setIsOpen={setIsRoleDdOpen}
            arrowIconComponent={<ArrowBottomIcon stroke={2} height={9} />}
          />
          <Button color="blue" style={styles.btn} onPress={createSubAccount}>
            <Text style={styles.btnText}>{t("createAccount")}</Text>
          </Button>
          <Button
            color="blue"
            style={styles.btn}
            onPress={() => setIsMainModalOpened(true)}
          >
            <Text style={styles.btnText}>{t("getReport")}</Text>
          </Button>
          <Button
            color="blue"
            style={styles.btn}
            onPress={() => navigate("AccountManagement")}
          >
            <Text style={styles.btnText}>{t("manageAccounts")}</Text>
          </Button>
          <Text style={styles.statistics}>
            {accounts.length}/{accountLimits} {t("accountsCount")}
          </Text>
        </View>
        <GetReportModal
          isOpen={isMainModalOpened}
          setIsOpen={setIsMainModalOpened}
        />
      </View>
    </PageTemplate>
  );
};

export default Admin;
