import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";
import { LogoIcon, SolarPanelIcon, WaveIcon } from "../../../../assets/icons";
import { screenWidth } from "../../../constants/screenSize";
import { useAuthNavigation } from "../../../hooks/useTypedNavigation";
import Button from "../../atoms/Button";
import HomeListPoint from "../../molecules/HomeListPoint";
import GradientPageTemplate from "../../templates/GradientPageTemplate";
import { styles } from "./styles";

let hasScrolledOnce = false;

const Home = () => {
  const { t } = useTranslation();
  const { navigate } = useAuthNavigation();
  const scrollRef = useRef<ScrollView>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (hasScrolledOnce) return;
    hasScrolledOnce = true;

    const timer = setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });

      setTimeout(() => {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      }, 1000);

      setTimeout(() => {
        setIsVisible(true);
      }, 5000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    scrollRef.current?.scrollToEnd({ animated: true });

    setTimeout(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
      setIsVisible(false);
    }, 1000);
  }, [isVisible]);

  return (
    <GradientPageTemplate ref={scrollRef}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text
            style={[styles.headerTitle, screenWidth <= 360 && { fontSize: 20 }]}
          >
            {t("welcome")}
          </Text>
          <LogoIcon width={screenWidth * 0.25} />
        </View>
        <View style={styles.line} />
        <Text style={styles.welcomeText}>{t("description")}</Text>
        <View style={styles.waveWrapper}>
          <View style={[styles.solarIcon, { marginBottom: 52 }]}>
            <SolarPanelIcon width={screenWidth * 0.33} />
          </View>
          <View style={styles.waveIcon}>
            <WaveIcon />
          </View>
        </View>
        <View style={styles.list}>
          <HomeListPoint text={t("accuracy")} />
          <HomeListPoint text={t("realtime_reporting")} />
          <HomeListPoint text={t("role_based_access")} />
          <HomeListPoint text={t("neural_network_tuning")} />
        </View>
        <View style={styles.btns}>
          <Text style={styles.improveText}>{t("improve_production")}</Text>
          <Button
            color="welcomeBrightBlue"
            style={styles.brightBlueBtn}
            onPress={() => navigate("Registration")}
          >
            <Text style={styles.brightBlueBtnText}>{t("signUp")}</Text>
          </Button>
          <Button
            color="welcomeBlue"
            style={styles.blueBtn}
            onPress={() => navigate("Login")}
          >
            <Text style={styles.blueBtnText}>{t("alreadyHaveAccount")}</Text>
          </Button>
        </View>
      </View>
    </GradientPageTemplate>
  );
};

export default Home;
