import { Buffer } from "buffer";
import api from "./index";

interface IExportDataParams {
  start_date: string;
  end_date: string;
  format: string;
}

export const getExportReport = async (params: IExportDataParams) => {
  const response = await api.post("/export/report", params, {
    responseType: "arraybuffer",
  });

  return Buffer.from(response.data);
};

export const getExportLog = async (params: IExportDataParams) => {
  const response = await api.post("/export/logs", params, {
    responseType: "arraybuffer",
  });

  return Buffer.from(response.data);
};
