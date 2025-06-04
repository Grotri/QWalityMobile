import useAuthStore from "../hooks/useAuthStore";

const scaleFontSize = {
  small: 0.825,
  medium: 1,
  large: 1.175,
};

export const getFontSize = (base: number): number => {
  const fontSize = useAuthStore.getState().user.fontSize;
  return base * scaleFontSize[fontSize];
};

export const getLineHeight = (base: number): number => {
  const fontSize = useAuthStore.getState().user.fontSize;
  return base * scaleFontSize[fontSize];
};
