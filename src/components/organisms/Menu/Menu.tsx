import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { LogoIcon, MenuProfileIcon } from "../../../../assets/icons";
import { menuItems } from "../../../constants/menuItems";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import Hamburger from "../../atoms/Hamburger/Hamburger";
import MenuItem from "../../molecules/MenuItem";
import { getStyles } from "./styles";
import { IMenu, IMenuItem } from "./types";

const Menu: FC<IMenu> = ({ isExpanded, setIsExpanded }) => {
  const { navigate } = useMainNavigation();
  const { t } = useTranslation();
  const styles = getStyles();

  const toggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Pressable style={[styles.headerBtn, { width: 44 }]} onPress={toggle}>
          <Hamburger active={isExpanded} />
          <Text style={styles.headerBtnTxt}>
            {isExpanded ? t("hide") : t("menu")}
          </Text>
        </Pressable>
        <LogoIcon width={83} />
        <Pressable style={styles.headerBtn} onPress={() => navigate("Profile")}>
          <MenuProfileIcon />
          <Text style={styles.headerBtnTxt}>{t("profile")}</Text>
        </Pressable>
      </View>
      {menuItems.map((item: IMenuItem, index: number) => (
        <MenuItem
          key={index}
          index={index}
          icon={item.icon}
          title={t(item.title)}
          isRoundBorder={index === menuItems.length - 1}
          isExpanded={isExpanded}
          onPress={() => navigate(item.path)}
        />
      ))}
    </View>
  );
};

export default Menu;
