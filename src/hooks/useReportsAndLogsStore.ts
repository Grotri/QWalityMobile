import { create } from "zustand";
import { getExportLog, getExportReport } from "../api/export";
import { downloadFile } from "../helpers/downloadFile";
import { convertISOToMoscow } from "../helpers/formatDate";
import { showErrorToast } from "../helpers/toast";
import i18n from "../i18n";

interface IUseReportsAndLogsStore {
  getReport: (
    startDate: Date,
    endDate: Date,
    format: string,
    onClose: () => void
  ) => void;
  getLog: (
    startDate: Date,
    endDate: Date,
    format: string,
    onClose: () => void
  ) => void;
}

const useReportsAndLogsStore = create<IUseReportsAndLogsStore>(() => ({
  getReport: async (startDate, endDate, format, onClose) => {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const start_date = convertISOToMoscow(start.toISOString());
    const end_date = convertISOToMoscow(end.toISOString());

    const start_date_format = start_date.split("T")[0];
    const end_date_format = end_date.split("T")[0];

    try {
      const buffer = await getExportReport({
        start_date,
        end_date,
        format,
      });

      const filename = `report_${start_date_format}_${end_date_format}.${format}`;
      const mimeType = format === "csv" ? "text/csv" : "application/pdf";

      await downloadFile(buffer, filename, mimeType);

      onClose();
    } catch (error) {
      showErrorToast(i18n.t("downloadReportError"));
      console.error(error);
    }
  },

  getLog: async (startDate, endDate, format, onClose) => {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const start_date = convertISOToMoscow(start.toISOString());
    const end_date = convertISOToMoscow(end.toISOString());

    const start_date_format = start_date.split("T")[0];
    const end_date_format = end_date.split("T")[0];

    try {
      const buffer = await getExportLog({
        start_date,
        end_date,
        format,
      });

      const filename = `log_${start_date_format}_${end_date_format}.${format}`;
      const mimeType = format === "csv" ? "text/csv" : "application/pdf";

      await downloadFile(buffer, filename, mimeType);

      onClose();
    } catch (error) {
      showErrorToast(i18n.t("downloadLogError"));
      console.error(error);
    }
  },
}));

export default useReportsAndLogsStore;
