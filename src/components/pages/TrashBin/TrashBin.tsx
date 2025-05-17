import { showErrorToast } from "@/src/helpers/toast";
import { useCameraLimits } from "@/src/helpers/useCameraLimits";
import { ICamera } from "@/src/model/camera";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { CrossIcon, TrashBinIcon } from "../../../../assets/icons";
import useAuthStore from "../../../hooks/useAuthStore";
import useCamerasStore from "../../../hooks/useCamerasStore";
import { usePalette } from "../../../hooks/usePalette";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import Button from "../../atoms/Button";
import DatePicker from "../../atoms/DatePicker";
import Modal from "../../atoms/Modal";
import BottomFixIcon from "../../molecules/BottomFixIcon";
import Camera from "../../molecules/Camera";
import Defect from "../../molecules/Defect";
import PageTemplate from "../../templates/PageTemplate";
import { IDefect } from "../Main/types";
import { getStyles } from "./styles";

const TrashBin = () => {
  const { navigate } = useMainNavigation();
  const { t } = useTranslation();
  const {
    cameras,
    recoverDefect,
    recoverCamera,
    clearTrashBin,
    clearTrashBinByDates,
  } = useCamerasStore();
  const { user } = useAuthStore();
  const cameraLimits = useCameraLimits();
  const styles = getStyles();
  const palette = usePalette();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const deletedDefects = cameras.flatMap((camera) =>
    camera.defects
      .filter((d) => !!d.deletedAt)
      .map((defect) => ({
        type: "defect",
        data: defect,
        cameraId: camera.id,
      }))
  );

  const deletedCameras = cameras
    .filter((camera) => !!camera.deletedAt)
    .map((camera) => ({ type: "camera", data: camera, cameraId: camera.id }));

  const trashItems = [...deletedCameras, ...deletedDefects].sort((a, b) => {
    const dateA = new Date(a.data.deletedAt ?? 0).getTime();
    const dateB = new Date(b.data.deletedAt ?? 0).getTime();
    return dateB - dateA;
  });

  useEffect(() => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  }, [cameras]);

  useEffect(() => {
    if (!isModalOpen) {
      setStartDate(null);
      setEndDate(null);
    }
  }, [isModalOpen]);

  return (
    <PageTemplate
      headerText={t("trash")}
      underlined
      onHeaderClick={() => navigate("Main", { direction: "backward" })}
      isWholeBlurOn={isModalOpen}
      bottomIcon={
        deletedDefects.length > 0 && user.role !== "user" ? (
          <BottomFixIcon
            icon={<TrashBinIcon width={36} height={36} />}
            text={t("clearCart")}
            onPress={() => setIsModalOpen(true)}
            gap={2}
            marginRight={24}
            marginBottom={28}
          />
        ) : null
      }
    >
      <View style={styles.wrapper}>
        {trashItems.length > 0 ? (
          trashItems.map((item) => {
            if (item.type === "defect") {
              return (
                <Defect
                  key={item.data.id}
                  defect={item.data as IDefect}
                  textBtn={user.role !== "user" ? t("restore") : undefined}
                  onPress={() => recoverDefect(item.cameraId, item.data.id)}
                />
              );
            } else {
              return (
                <Camera
                  key={item.data.id}
                  camera={item.data as ICamera}
                  onPress={() => {
                    if (
                      cameras.filter((c) => !c.deletedAt).length < cameraLimits
                    ) {
                      recoverCamera(item.cameraId);
                    } else {
                      showErrorToast(t("camerasLimitReached"));
                    }
                  }}
                />
              );
            }
          })
        ) : (
          <Text style={styles.noDefects}>{t("trashEmpty")}</Text>
        )}
      </View>
      <Modal isVisible={isModalOpen} setIsVisible={setIsModalOpen}>
        <View style={styles.modal}>
          <View style={styles.crossIconWrapper}>
            <CrossIcon
              style={styles.crossIcon}
              onClick={() => setIsModalOpen(false)}
            />
            <Text style={styles.modalTitle}>{t("deleteHistory")}</Text>
          </View>
          <View style={styles.row}>
            <DatePicker
              date={startDate}
              setDate={(date) => setStartDate(date)}
            />
            <View style={styles.dash} />
            <DatePicker date={endDate} setDate={(date) => setEndDate(date)} />
          </View>
          <View style={styles.row}>
            <Button color="red" style={styles.btnModal} onPress={clearTrashBin}>
              <Text style={styles.btnModalText}>{t("deleteAll")}</Text>
            </Button>
            <View style={styles.empty} />
            <Button
              customColor={palette.modalBtn}
              style={styles.btnModal}
              onPress={() => clearTrashBinByDates(startDate, endDate)}
            >
              <Text style={styles.btnModalText}>{t("delete")}</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </PageTemplate>
  );
};

export default TrashBin;
