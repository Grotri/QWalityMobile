import { screenWidth } from "@/src/constants/screenSize";
import useAuthStore from "@/src/hooks/useAuthStore";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { ArrowLeftIcon } from "../../../../assets/icons";
import Button from "../../atoms/Button";
import { getStyles } from "./styles";
import { IHeader } from "./types";

const Header: FC<IHeader> = ({
  onClick,
  headerText,
  underlined = false,
  languageToggle = false,
}) => {
  const { language, setLanguage } = useAuthStore();
  const styles = getStyles();
  const { t } = useTranslation();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          {onClick && <ArrowLeftIcon onClick={onClick} />}
          <View
            style={[
              styles.headerTextWrapper,
              { width: onClick ? (screenWidth < 390 ? "75%" : "83%") : null },
            ]}
          >
            <Text style={styles.headerText}>{t(headerText)}</Text>
          </View>
          {languageToggle && (
            <Button
              style={styles.language}
              color="blueTransparent"
              onPress={() => setLanguage(language === "eng" ? "ru" : "eng")}
            >
              <Text style={styles.languageText}>
                {language === "eng" ? "en" : "ru"}
              </Text>
            </Button>
          )}
        </View>
        {underlined && <View style={styles.line} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Header;
