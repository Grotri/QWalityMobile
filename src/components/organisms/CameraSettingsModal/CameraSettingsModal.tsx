import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { CrossIcon } from "../../../../assets/icons";
import useCamerasStore from "../../../hooks/useCamerasStore";
import { usePalette } from "../../../hooks/usePalette";
import { initialCamera } from "../../../model/camera";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import Modal from "../../atoms/Modal";
import Radio from "../../atoms/Radio";
import { ICamera } from "../../pages/Main/types";
import { getStyles } from "./styles";
import { ICameraSettingsModal } from "./types";

const CameraSettingsModal: FC<ICameraSettingsModal> = ({
  camera,
  setCamera,
  isHistoryModalOpen,
  setIsHistoryModalOpen,
}) => {
  const styles = getStyles();
  const palette = usePalette();
  const { t } = useTranslation();
  const {
    errors,
    setErrorsField,
    editCamera,
    refreshErrors,
    deleteCamera,
    deleteHistory,
  } = useCamerasStore();
  const [cameraInfo, setCameraInfo] = useState<ICamera>({ ...initialCamera });
  const { title, link, online } = cameraInfo;

  const handleEditCamera = () => {
    editCamera(cameraInfo, setCamera);
    setIsHistoryModalOpen(null);
  };

  const openHistoryModal = () => {
    setIsHistoryModalOpen(true);
  };

  const openCameraModal = () => {
    setIsHistoryModalOpen(false);
  };

  const closeModal = () => {
    setIsHistoryModalOpen(null);
    setCamera(null);
  };

  useEffect(() => {
    if (camera) {
      refreshErrors();
      setCameraInfo({ ...camera });
    }
  }, [camera]);

  return (
    <Modal isVisible={!!camera} onBackdropPress={closeModal}>
      <View style={styles.modals}>
        <View style={styles.modal}>
          <View style={styles.crossIconWrapper}>
            <CrossIcon style={styles.crossIcon} onClick={closeModal} />
            <Input
              value={title}
              onChangeText={(title) => {
                setCameraInfo({ ...cameraInfo, title });
                setErrorsField("name", "");
              }}
              customStyles={styles.customTitleStyles}
              customInputStyles={styles.customTitleInputStyles}
              cursorColor={palette.subTextMainScreenPopup}
              maxLength={15}
              errorText={errors.name}
            />
          </View>
          <Input
            label={t("cameraLink")}
            value={link}
            onChangeText={(link) => {
              setCameraInfo({ ...cameraInfo, link });
              setErrorsField("link", "");
            }}
            customLabelStyles={styles.customLabelStyles}
            customStyles={styles.customStyles}
            customInputStyles={styles.customInputStyles}
            cursorColor={palette.subTextMainScreenPopup}
            errorText={errors.link}
          />
          <View style={styles.stateWrapper}>
            <Text style={styles.stateText}>{t("status")}</Text>
            <View style={styles.stateRadios}>
              <Radio
                label={t("online")}
                labelStyle={styles.radioLabelStyle}
                radioWrapperStyle={styles.radioWrapperStyle}
                isChecked={online}
                setIsChecked={() =>
                  setCameraInfo({ ...cameraInfo, online: true })
                }
              />
              <Radio
                label={t("offline")}
                labelStyle={styles.radioLabelStyle}
                radioWrapperStyle={styles.radioWrapperStyle}
                isChecked={!online}
                setIsChecked={() =>
                  setCameraInfo({ ...cameraInfo, online: false })
                }
              />
            </View>
          </View>
          <View style={styles.btns}>
            <View style={styles.flexBtns}>
              <Button style={styles.btn} color="red" onPress={openHistoryModal}>
                <Text style={styles.btnText}>{t("deleteHistory")}</Text>
              </Button>
              <Button style={styles.btn} color="red" onPress={openCameraModal}>
                <Text style={styles.btnText}>{t("deleteCamera")}</Text>
              </Button>
            </View>
            <Button
              style={styles.fullBtn}
              color="modal"
              onPress={handleEditCamera}
            >
              <Text style={styles.fullBtnText}>{t("save")}</Text>
            </Button>
          </View>
        </View>
        {isHistoryModalOpen !== null && (
          <View style={styles.modal}>
            <Text style={styles.smallModalTitle}>
              {t("confirmDelete")}{" "}
              {isHistoryModalOpen ? t("history") : t("cameraTake")}?
            </Text>
            <View style={styles.smallModalBtns}>
              <Button
                style={styles.btn}
                color="red"
                onPress={() => {
                  if (!isHistoryModalOpen) {
                    deleteCamera(cameraInfo);
                  } else {
                    deleteHistory(cameraInfo.id);
                  }
                  closeModal();
                }}
              >
                <Text style={styles.btnBolderText}>{t("yes")}</Text>
              </Button>
              <Button
                style={styles.btn}
                color="modal"
                onPress={() => setIsHistoryModalOpen(null)}
              >
                <Text style={styles.btnBolderText}>{t("no")}</Text>
              </Button>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default CameraSettingsModal;
