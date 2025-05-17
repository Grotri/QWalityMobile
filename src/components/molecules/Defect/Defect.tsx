import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { convertISODate } from "../../../helpers/formatDate";
import Button from "../../atoms/Button";
import { getStyles } from "./styles";
import { IDefectItem } from "./types";

const Defect: FC<IDefectItem> = ({
  defect,
  textBtn,
  onPress,
  setSelectedDefect,
  pressableIcon = false,
}) => {
  const styles = getStyles();
  const { t } = useTranslation();
  const { name, date } = defect;

  const clickDefect = () => {
    if (setSelectedDefect) {
      setSelectedDefect(defect);
    }
  };

  return (
    <View style={styles.itemWrapper}>
      <View style={styles.item}>
        {pressableIcon ? (
          <Button style={styles.image} onPress={clickDefect}>
            <Text style={styles.imageText}>.jpg</Text>
          </Button>
        ) : (
          <View style={styles.image}>
            <Text style={styles.imageText}>.jpg</Text>
          </View>
        )}
        <View>
          <Text style={styles.itemName}>{t(name)}</Text>
          <Text style={styles.itemDate}>{convertISODate(date)}</Text>
        </View>
      </View>
      {textBtn && (
        <Button onPress={onPress}>
          <Text style={styles.btnText}>{textBtn}</Text>
        </Button>
      )}
    </View>
  );
};

export default Defect;
