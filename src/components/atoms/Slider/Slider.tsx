import { Slider as ReactSlider } from "@miblanchard/react-native-slider";
import React, { FC } from "react";
import { Text, View } from "react-native";
import { TooltipIcon } from "../../../../assets/icons";
import { screenWidth } from "../../../constants/screenSize";
import { usePalette } from "../../../hooks/usePalette";
import { getStyles } from "./styles";
import { ISlider } from "./types";

const Slider: FC<ISlider> = ({ value, onChange }) => {
  const styles = getStyles();
  const palette = usePalette();

  const sliderWidth = screenWidth - 54 * 2;
  const tooltipWidth = 39;
  const thumbWidth = 15;

  const percentageOffset =
    value * (sliderWidth - thumbWidth) + thumbWidth / 2 - tooltipWidth / 2;

  return (
    <View style={styles.sliderWrapper}>
      <ReactSlider
        containerStyle={styles.slider}
        trackStyle={styles.sliderTrack}
        thumbStyle={styles.sliderThumb}
        value={value}
        onValueChange={(val) => onChange(+val[0].toFixed(2))}
        minimumValue={0}
        maximumValue={1}
        step={0.01}
        trackClickable={true}
        minimumTrackTintColor={palette.textFieldInFolderBg}
        maximumTrackTintColor="#3154AC"
        thumbTintColor="#D9D9D9"
      />
      <View
        style={[styles.tooltipWrapper, { top: 28, left: percentageOffset }]}
      >
        <TooltipIcon />
        <Text style={styles.tooltipText}>{+(value * 100).toFixed(0)}%</Text>
      </View>
    </View>
  );
};

export default Slider;
