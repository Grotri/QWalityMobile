import React, { FC } from "react";
import { Text, TextInput, View } from "react-native";
import { usePalette } from "../../../hooks/usePalette";
import { getStyles } from "./styles";
import { IInput } from "./types";

const Input: FC<IInput> = ({
  value,
  label,
  customStyles,
  customInputStyles,
  customLabelStyles,
  customInputWrapperStyles,
  onChangeText,
  onPress,
  placeholder,
  keyboardType = "default",
  keyboardAppearance = "default",
  inputMode = "text",
  maxLength,
  secureTextEntry = false,
  placeholderTextColor,
  rightIcon,
  cursorColor,
  errorText,
  errorStyles,
}) => {
  const styles = getStyles();
  const palette = usePalette();
  
  return (
    <View style={[styles.container, customStyles]}>
      {label && <Text style={[styles.label, customLabelStyles]}>{label}</Text>}
      <View style={customInputWrapperStyles}>
        <TextInput
          style={[
            styles.input,
            errorText && styles.inputError,
            !!rightIcon && styles.inputIcon,
            customInputStyles,
          ]}
          onChangeText={onChangeText}
          onPress={onPress}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          keyboardAppearance={keyboardAppearance}
          inputMode={inputMode}
          maxLength={maxLength}
          cursorColor={cursorColor || palette.black}
          secureTextEntry={secureTextEntry}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {errorText && (
        <Text style={[styles.error, errorStyles]}>{errorText}</Text>
      )}
    </View>
  );
};

export default Input;
