import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { getStyles } from "./styles";
import { IButton } from "./types";

const Button: FC<IButton> = ({
  children,
  onPress,
  style,
  color,
  customColor,
  disabled,
}) => {
  const styles = getStyles();

  const buttonColorStyle = styles[`btn_${color}` as keyof typeof styles];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.btn,
        buttonColorStyle,
        customColor && { backgroundColor: customColor },
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;
