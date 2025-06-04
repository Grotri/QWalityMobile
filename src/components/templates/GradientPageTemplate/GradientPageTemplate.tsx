import React, { forwardRef, PropsWithChildren, Ref } from "react";
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { screenHeight, screenWidth } from "../../../constants/screenSize";
import RadialGradientBg from "../../atoms/RadialGradient";
import Header from "../../molecules/Header";
import { getStyles } from "./styles";
import { IGradientPageTemplate } from "./types";

const GradientPageTemplate = forwardRef(
  (
    {
      children,
      mustScroll = true,
      headerText,
      onHeaderClick,
      underlined = false,
      toggleLanguage = false,
    }: PropsWithChildren<IGradientPageTemplate>,
    scrollRef: Ref<ScrollView>
  ) => {
    const styles = getStyles();

    return (
      <SafeAreaView style={styles.container}>
        <RadialGradientBg
          screenWidth={screenWidth}
          screenHeight={screenHeight}
        />
        {headerText && (
          <Header
            headerText={headerText}
            onClick={onHeaderClick}
            underlined={underlined}
            languageToggle={toggleLanguage}
          />
        )}
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          {mustScroll ? (
            <ScrollView
              ref={scrollRef}
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          ) : (
            <View style={styles.scrollContainer}>{children}</View>
          )}
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
);

GradientPageTemplate.displayName = "GradientPageTemplate";

export default GradientPageTemplate;
