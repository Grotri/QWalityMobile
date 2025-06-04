import { EErrors } from "@/src/constants/errors";
import useReportsAndLogsStore from "@/src/hooks/useReportsAndLogsStore";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { ArrowBottomIcon, CrossIcon } from "../../../../assets/icons";
import { formats } from "../../../constants/formats";
import { showErrorToast, showSuccessToast } from "../../../helpers/toast";
import { usePalette } from "../../../hooks/usePalette";
import Button from "../../atoms/Button";
import DatePicker from "../../atoms/DatePicker";
import Dropdown from "../../atoms/Dropdown";
import Modal from "../../atoms/Modal";
import Radio from "../../atoms/Radio";
import { getStyles } from "./styles";
import { IGetReportModal } from "./types";

const GetReportModal: FC<IGetReportModal> = ({ isOpen, setIsOpen }) => {
  const styles = getStyles();
  const palette = usePalette();
  const { t } = useTranslation();
  const { getReport, getLog } = useReportsAndLogsStore();
  const [isSubModalOpened, setIsSubModalOpened] = useState<boolean>(false);
  const [isFormatDdOpen, setIsFormatDdOpen] = useState<boolean>(false);
  const [type, setType] = useState<"report" | "log">("report");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [format, setFormat] = useState<string>("pdf");

  const validateDates = (): boolean => {
    if (!startDate || !endDate) {
      showErrorToast(t(EErrors.chooseDates));
      return false;
    }

    if (endDate > new Date()) {
      showErrorToast(t(EErrors.futureDate));
      return false;
    }

    if (startDate > endDate) {
      showErrorToast(t(EErrors.timeDates));
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateDates()) return;

    if (startDate && endDate) {
      if (type === "report") {
        getReport(startDate, endDate, format, closeModals);
      } else if (type === "log") {
        getLog(startDate, endDate, format, closeModals);
      }
    }
  };

  const handleDelete = () => {
    if (!validateDates()) return;

    showSuccessToast(type === "log" ? t("logDeleted") : t("reportDeleted"));
    closeModals();
  };

  const closeModals = () => {
    if (isSubModalOpened) {
      setIsSubModalOpened(false);
    }
    setIsOpen(false);
    if (isFormatDdOpen) {
      setIsFormatDdOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setType("report");
      setStartDate(null);
      setEndDate(null);
      setFormat("pdf");
    }
  }, [isOpen]);

  return (
    <View style={styles.wrapper}>
      <Modal
        isVisible={isOpen}
        setIsVisible={setIsOpen}
        onPress={() => {
          if (isFormatDdOpen) {
            setIsFormatDdOpen(false);
          }
        }}
        onBackdropPress={closeModals}
      >
        <View style={styles.modals}>
          <View style={styles.modal}>
            <View style={styles.crossIconWrapper}>
              <CrossIcon style={styles.crossIcon} onClick={closeModals} />
              <Text style={styles.modalTitle}>
                {type === "log" ? t("getLog") : t("getReport")}
              </Text>
            </View>
            <View style={styles.modalContent}>
              <View style={styles.row}>
                <Radio
                  label={t("report")}
                  isChecked={type === "report"}
                  setIsChecked={() => {
                    setType("report");
                  }}
                />
                <View style={styles.empty} />
                <Radio
                  label={t("log")}
                  isChecked={type === "log"}
                  setIsChecked={() => {
                    setType("log");
                  }}
                />
              </View>
              <View style={styles.row}>
                <DatePicker
                  date={startDate}
                  setDate={(date) => setStartDate(date)}
                />
                <View style={styles.dash} />
                <DatePicker
                  date={endDate}
                  setDate={(date) => setEndDate(date)}
                />
              </View>
              <View style={styles.row}>
                <Dropdown
                  data={formats.map((format) => ({
                    value: format.id,
                    label: format.name,
                  }))}
                  value={format}
                  setValue={setFormat}
                  isOpen={isFormatDdOpen}
                  setIsOpen={setIsFormatDdOpen}
                  wrapperStyle={styles.flex}
                  dropdownStyle={styles.dropdownStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  borderColor={palette.dateAndListSelectsPopupBg}
                  arrowIconComponent={<ArrowBottomIcon stroke={2} height={9} />}
                />
                <View style={styles.empty} />
                <View style={styles.flex} />
              </View>
              <View style={styles.row}>
                <Button
                  color="red"
                  style={styles.btnModal}
                  onPress={() => setIsSubModalOpened(true)}
                >
                  <Text style={styles.btnModalText}>
                    {type === "log" ? t("deleteLog") : t("deleteReport")}
                  </Text>
                </Button>
                <View style={styles.empty} />
                <Button
                  customColor={palette.modalBtn}
                  style={styles.btnModal}
                  onPress={handleSave}
                >
                  <Text style={styles.btnModalText}>{t("download")}</Text>
                </Button>
              </View>
            </View>
          </View>
          {isSubModalOpened && (
            <View style={styles.modal}>
              <Text style={styles.subModalTitle}>
                {type === "log"
                  ? t("confirmDeleteLog")
                  : t("confirmDeleteReport")}
              </Text>
              <View style={styles.modalContent}>
                <View style={styles.row}>
                  <Button
                    color="red"
                    style={styles.btnModal}
                    onPress={handleDelete}
                  >
                    <Text style={styles.btnModalTextBold}>{t("yes")}</Text>
                  </Button>
                  <View style={styles.empty} />
                  <Button
                    customColor={palette.modalBtn}
                    style={styles.btnModal}
                    onPress={() => {
                      setIsSubModalOpened(false);
                    }}
                  >
                    <Text style={styles.btnModalTextBold}>{t("no")}</Text>
                  </Button>
                </View>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default GetReportModal;
