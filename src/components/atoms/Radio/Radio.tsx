import React, { FC } from "react";
import { Pressable, Text, View } from "react-native";
import { getStyles } from "./styles";
import { IRadio } from "./types";

const Radio: FC<IRadio> = ({
  label,
  isChecked = false,
  setIsChecked,
  style,
  labelStyle,
  radioWrapperStyle,
}) => {
  const styles = getStyles();

  return (
    <Pressable onPress={setIsChecked} style={[styles.wrapper, style]}>
      <View style={[styles.radioWrapper, radioWrapperStyle]}>
        <View style={styles.radio}>
          {isChecked && <View style={styles.radioChecked} />}
        </View>
        <Text style={[styles.radioText, labelStyle]}>{label}</Text>
      </View>
    </Pressable>
  );
};

export default Radio;
