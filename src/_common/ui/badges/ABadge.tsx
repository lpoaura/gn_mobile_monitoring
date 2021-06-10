import React from "react";
import { StyleSheet, View } from "react-native";
import { ColorsTheme } from "../Colors.theme";
import { AText } from "../text/AText";

type Props = {
  label: string;
  theme?: "primary" | "secondary" | "regular";
};

export function ABadge(props: Props) {
  return (
    <View style={[styles.container, styles[props.theme ?? "regular"]]}>
      <AText style={styles[props.theme ?? "regular"]} theme="small">
        {props.label}
      </AText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 5,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
  },
  primary: {
    backgroundColor: ColorsTheme.primary,
    color: ColorsTheme.textOnPrimary,
  },
  secondary: {
    backgroundColor: ColorsTheme.secondaryLight,
    color: ColorsTheme.textOnSecondary,
  },
  regular: {
    backgroundColor: ColorsTheme.background,
    color: ColorsTheme.textOnBackground,
  },
});
