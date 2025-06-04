import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { screenHeight, screenWidth } from "../../../constants/screenSize";
import { usePalette } from "../../../hooks/usePalette";
import Button from "../../atoms/Button";
import Radio from "../../atoms/Radio";
import { getStyles } from "./styles";
import { ISliderCard } from "./types";

const SliderCard: FC<ISliderCard> = ({
  id,
  currentId,
  title,
  description,
  radioLabels,
  price,
  onPress,
}) => {
  const styles = getStyles();
  const palette = usePalette();
  const { t } = useTranslation();

  const isSmallHeight = screenHeight < 700;

  return (
    <View style={{ width: screenWidth }} key={id}>
      <View style={[styles.card, { paddingVertical: isSmallHeight ? 16 : 20 }]}>
        <View style={styles.topView}>
          <Text style={styles.title}>{t(title)}</Text>
          <View style={styles.line} />
          <Text
            style={[
              styles.description,
              {
                fontSize: isSmallHeight ? 18 : 20,
                lineHeight: isSmallHeight ? 22 : 28,
                marginBottom: isSmallHeight ? 20 : 28,
              },
            ]}
          >
            {t(description)}
          </Text>
          <View style={[styles.radios, { gap: isSmallHeight ? 24 : 40 }]}>
            {radioLabels.map((label: string, index: number) => (
              <Radio
                label={t(label)}
                isChecked
                key={index}
                style={styles.radio}
              />
            ))}
          </View>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.price}>
            {price} {t("rubPerMonth")}
          </Text>
          {currentId !== undefined && currentId === id ? (
            <View style={[styles.btn, { backgroundColor: palette.btnChoosen }]}>
              <Text style={styles.btnText}>{t("selected")}</Text>
            </View>
          ) : (
            <Button
              color="welcomeBrightBlue"
              style={styles.btn}
              onPress={onPress}
            >
              <Text style={styles.btnText}>{t("choose")}</Text>
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};

export default SliderCard;
