import React, { FC } from "react";
import { Platform, TouchableWithoutFeedback, View } from "react-native";
import WebView from "react-native-webview";
import { BlurView as ExpoBlurView } from "expo-blur";
import { styles } from "./styles";
import { IBlurView } from "./types";

const BlurView: FC<IBlurView> = ({ onPress, customIOSStyles }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    {Platform.OS === "ios" ? (
      <ExpoBlurView
        intensity={15}
        tint="dark"
        style={[styles.absoluteIOS, customIOSStyles]}
      />
    ) : (
      <View style={styles.absolute}>
        <WebView
          style={styles.absolute}
          source={{
            html: `
              <div style="position: absolute;
                top: 0;
                right:0;
                bottom: 0;
                left: 0;
                background: rgba(217, 217, 217, 0);
                -webkit-backdrop-filter: blur(8px);
                backdrop-filter: blur(8px);">
              </div>
            `,
          }}
        />
      </View>
    )}
  </TouchableWithoutFeedback>
);

export default BlurView;
