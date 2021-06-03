import React from "react";
import { AText } from "../text/AText";
import { ColorsTheme } from "../Colors.theme";
import { View } from "react-native";

export function GNMMLogo() {
  return (
    <View>
      <AText color={ColorsTheme.textOnSecondary} theme="logo">
        GN
      </AText>
      <AText color={ColorsTheme.textOnSecondary} theme="logo" style={{ marginTop: -18 }}>
        MONITORING
      </AText>
    </View>
  );
}
