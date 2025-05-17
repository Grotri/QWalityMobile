import { CameraIcon } from "@/assets/icons";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import Button from "../../atoms/Button";
import { getStyles } from "./styles";
import { ICameraItem } from "./types";

const Defect: FC<ICameraItem> = ({ camera, onPress }) => {
  const styles = getStyles();
  const { t } = useTranslation();

  return (
    <View style={styles.itemWrapper}>
      <View style={styles.item}>
        <View style={styles.image}>
          <CameraIcon width={20} height={20} />
        </View>
        <Text style={styles.itemName}>{camera.title}</Text>
      </View>
      <Button onPress={onPress}>
        <Text style={styles.btnText}>{t("restore")}</Text>
      </Button>
    </View>
  );
};

export default Defect;
