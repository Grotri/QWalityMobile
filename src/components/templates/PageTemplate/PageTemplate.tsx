import React, { FC, Fragment, PropsWithChildren, useState } from "react";
import {
  Keyboard,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import BlurView from "../../atoms/BlurView";
import Header from "../../molecules/Header";
import Menu from "../../organisms/Menu";
import { getStyles } from "./styles";
import { IPageTemplate } from "./types";

const PageTemplate: FC<PropsWithChildren & IPageTemplate> = ({
  children,
  mustScroll = true,
  onTouchablePress,
  headerText,
  onHeaderClick,
  underlined = false,
  bottomIcon,
  hasMenu = false,
  isBlurOn = false,
  isWholeBlurOn = false,
}) => {
  const styles = getStyles();
  const insets = useSafeAreaInsets();
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false);

  const closeMenu = () => {
    if (isMenuExpanded) {
      setIsMenuExpanded(false);
    }
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        {hasMenu && (
          <View style={[styles.fixBackground, { height: insets.top }]} />
        )}
        {headerText && (
          <Header
            headerText={headerText}
            onClick={onHeaderClick}
            underlined={underlined}
          />
        )}
        {hasMenu && (
          <Menu isExpanded={isMenuExpanded} setIsExpanded={setIsMenuExpanded} />
        )}
        <Fragment>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
              if (onTouchablePress) {
                onTouchablePress();
              }
            }}
          >
            {mustScroll ? (
              <ScrollView
                contentContainerStyle={styles.scrollContainer}
                nestedScrollEnabled
              >
                {children}
                {bottomIcon && <View style={styles.bottomIconContainer} />}
                {Platform.OS !== "ios" && (isMenuExpanded || isBlurOn) && (
                  <BlurView onPress={closeMenu} />
                )}
              </ScrollView>
            ) : (
              <View style={styles.scrollContainer}>{children}</View>
            )}
          </TouchableWithoutFeedback>
          {bottomIcon && (
            <View style={styles.bottomIcon}>
              {bottomIcon}
              {Platform.OS !== "ios" && (isMenuExpanded || isBlurOn) && (
                <BlurView onPress={closeMenu} />
              )}
            </View>
          )}
          {Platform.OS === "ios" && (isMenuExpanded || isBlurOn) && (
            <BlurView
              onPress={closeMenu}
              customIOSStyles={{ top: 73 + insets.top }}
            />
          )}
        </Fragment>
      </SafeAreaView>
      {isWholeBlurOn && <BlurView />}
    </Fragment>
  );
};

export default PageTemplate;
