import { create } from "zustand";
import { deleteExportLogs, getExportLog, getExportReport } from "../api/export";
import { downloadFile } from "../helpers/downloadFile";
import { convertISOToMoscow } from "../helpers/formatDate";
import { showErrorToast, showSuccessToast } from "../helpers/toast";
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
  deleteLog: (startDate: Date, endDate: Date, onClose: () => void) => void;
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

  deleteLog: async (startDate, endDate, onClose) => {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const start_date = convertISOToMoscow(start.toISOString());
    const end_date = convertISOToMoscow(end.toISOString());

    try {
      await deleteExportLogs({
        start_date,
        end_date,
      });

      onClose();
      showSuccessToast(i18n.t("logDeleted"));
    } catch (error) {
      showErrorToast(i18n.t("logDeleteError"));
      console.error(error);
    }
  },
}));

export default useReportsAndLogsStore;
