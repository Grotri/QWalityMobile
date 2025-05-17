import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { CrossIcon } from "../../../../assets/icons";
import useCamerasStore from "../../../hooks/useCamerasStore";
import { usePalette } from "../../../hooks/usePalette";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import Modal from "../../atoms/Modal";
import { getStyles } from "./styles";
import { IAddCameraModal } from "./types";

const AddCameraModal: FC<IAddCameraModal> = ({ isOpen, setIsOpen }) => {
  const styles = getStyles();
  const palette = usePalette();
  const { t } = useTranslation();
  const { addCamera, errors, setErrorsField, refreshErrors } =
    useCamerasStore();
  const [name, setName] = useState<string>("");
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    if (!isOpen) {
      refreshErrors();
      setName("");
      setLink("");
    }
  }, [isOpen]);

  return (
    <View style={styles.wrapper}>
      <Modal isVisible={isOpen} setIsVisible={setIsOpen}>
        <View style={styles.modal}>
          <View style={styles.crossIconWrapper}>
            <CrossIcon
              style={styles.crossIcon}
              onClick={() => setIsOpen(false)}
            />
            <Text style={styles.modalTitle}>{t("addCamera")}</Text>
          </View>
          <Input
            label={t("name")}
            value={name}
            onChangeText={(name) => {
              setName(name);
              setErrorsField("name", "");
            }}
            customLabelStyles={styles.customLabelStyles}
            customStyles={styles.customStyles}
            customInputStyles={styles.customInputStyles}
            cursorColor={palette.subTextMainScreenPopup}
            errorText={errors.name}
            maxLength={20}
          />
          <Input
            label={t("cameraLink")}
            value={link}
            onChangeText={(link) => {
              setLink(link);
              setErrorsField("link", "");
            }}
            customLabelStyles={styles.customLabelStyles}
            customStyles={styles.customStyles}
            customInputStyles={styles.customInputStyles}
            cursorColor={palette.subTextMainScreenPopup}
            errorText={errors.link}
          />
          <Button
            style={styles.btn}
            color="modal"
            onPress={() => addCamera(name, link)}
          >
            <Text style={styles.btnText}>{t("add")}</Text>
          </Button>
        </View>
      </Modal>
    </View>
  );
};

export default AddCameraModal;
