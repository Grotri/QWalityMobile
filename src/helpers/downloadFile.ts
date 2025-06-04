import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export const downloadFile = async (
  buffer: Buffer,
  filename: string,
  mimeType: string
) => {
  const base64Data = buffer.toString("base64");
  const fileUri = FileSystem.documentDirectory + filename;

  await FileSystem.writeAsStringAsync(fileUri, base64Data, {
    encoding: FileSystem.EncodingType.Base64,
  });

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(fileUri, {
      mimeType,
      dialogTitle: "Открыть файл",
      UTI: mimeType,
    });
  } else {
    throw new Error("Sharing not available on this device");
  }
};
