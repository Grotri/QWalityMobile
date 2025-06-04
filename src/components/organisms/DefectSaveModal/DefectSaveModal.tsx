import useCamerasStore from "@/src/hooks/useCamerasStore";
import { usePalette } from "@/src/hooks/usePalette";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, View } from "react-native";
import { showInfoToast } from "../../../helpers/toast";
import { initialDefect } from "../../../model/defect";
import Button from "../../atoms/Button";
import Modal from "../../atoms/Modal";
import { IDefect } from "../../pages/Main/types";
import { getStyles } from "./styles";
import { IDefectSaveModal } from "./types";

const DefectSaveModal: FC<IDefectSaveModal> = ({ onClose, defect }) => {
  const styles = getStyles();
  const palette = usePalette();
  const { t } = useTranslation();
  const { downloadDefectImage, photoLoading } = useCamerasStore();
  const [defectInfo, setDefectInfo] = useState<IDefect>({ ...initialDefect });
  const { id, name, date, photo } = defectInfo;

  const handleDownload = async () => {
    if (!photo) {
      showInfoToast(t("noPhoto"));
      onClose();
      return;
    }

    downloadDefectImage(photo, id, onClose);
  };

  useEffect(() => {
    if (defect) {
      setDefectInfo({ ...defect });
    }
  }, [defect]);

  return (
    <Modal isVisible={!!defect} onBackdropPress={onClose}>
      <View style={styles.modal}>
        {photoLoading && <ActivityIndicator color={palette.white} />}
        {!photoLoading && (
          <>
            <View style={styles.mainInfo}>
              <Text style={styles.title}>{t("wantDownloadImage")}</Text>
              <Text style={styles.name}>
                {t("defect")} ({t(name)}) {date}
              </Text>
            </View>
            <View style={styles.btns}>
              <Button color="modal" style={styles.btn} onPress={handleDownload}>
                <Text style={styles.btnText}>{t("yes")}</Text>
              </Button>
              <Button color="modal" style={styles.btn} onPress={onClose}>
                <Text style={styles.btnText}>{t("no")}</Text>
              </Button>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default DefectSaveModal;
