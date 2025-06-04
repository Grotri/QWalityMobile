import React, { FC, useState } from "react";
import { EyeIcon } from "../../../../assets/icons";
import { usePalette } from "../../../hooks/usePalette";
import Input from "../Input/Input";
import { IInputPassword } from "./types";

const InputPassword: FC<IInputPassword> = ({
  value,
  label,
  customStyles,
  customInputStyles,
  customLabelStyles,
  customInputWrapperStyles,
  onChangeText,
  cursorColor,
  errorText,
  errorStyles,
  iconColor,
  iconSize,
  placeholder,
}) => {
  const palette = usePalette();
  const [isSecured, setIsSecured] = useState<boolean>(true);

  return (
    <Input
      secureTextEntry={isSecured}
      label={label}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      customStyles={customStyles}
      customInputStyles={customInputStyles}
      customLabelStyles={customLabelStyles}
      customInputWrapperStyles={customInputWrapperStyles}
      errorStyles={errorStyles}
      cursorColor={cursorColor || palette.black}
      errorText={errorText}
      rightIcon={
        <EyeIcon
          color={iconColor}
          width={iconSize}
          height={iconSize}
          isActive={!isSecured}
          onClick={() => setIsSecured(!isSecured)}
        />
      }
    />
  );
};

export default InputPassword;
