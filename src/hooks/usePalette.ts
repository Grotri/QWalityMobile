import { lightPalette } from "../constants/lightPalette";
import { palette as darkPalette } from "../constants/palette";
import useAuthStore from "./useAuthStore";

export const usePalette = () => {
  const theme = useAuthStore((state) => state.user.theme);
  return theme === "dark" ? darkPalette : lightPalette;
};
