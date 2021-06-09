import React from "react";
import { StyleSheet, View } from "react-native";
import { ColorsTheme } from "../Colors.theme";
import { AText } from "../text/AText";

type Props = {
  label: string;
  onClick?: () => void;
};

export function ABadge(props: Props) {
  return (
    <View style={styles.container}>
      <AText>{props.label}</AText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    minHeight: 40,
    fontSize: 18,
    backgroundColor: ColorsTheme.secondaryLight,
    color: ColorsTheme.textOnSecondary,
  },
});
