import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { showSuccessToast } from "../../../helpers/toast";
import { initialDefect } from "../../../model/defect";
import Button from "../../atoms/Button";
import Modal from "../../atoms/Modal";
import { IDefect } from "../../pages/Main/types";
import { getStyles } from "./styles";
import { IDefectSaveModal } from "./types";

const DefectSaveModal: FC<IDefectSaveModal> = ({ onClose, defect }) => {
  const styles = getStyles();
  const { t } = useTranslation();
  const [defectInfo, setDefectInfo] = useState<IDefect>({ ...initialDefect });
  const { name, date } = defectInfo;

  useEffect(() => {
    if (defect) {
      setDefectInfo({ ...defect });
    }
  }, [defect]);

  return (
    <Modal isVisible={!!defect} onBackdropPress={onClose}>
      <View style={styles.modal}>
        <View style={styles.mainInfo}>
          <Text style={styles.title}>{t("wantDownloadImage")}</Text>
          <Text style={styles.name}>
            {t("defect")} ({t(name)}) {date}
          </Text>
        </View>
        <View style={styles.btns}>
          <Button
            color="modal"
            style={styles.btn}
            onPress={() => {
              onClose();
              showSuccessToast(t("imageDownloaded"));
            }}
          >
            <Text style={styles.btnText}>{t("yes")}</Text>
          </Button>
          <Button color="modal" style={styles.btn} onPress={onClose}>
            <Text style={styles.btnText}>{t("no")}</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default DefectSaveModal;
