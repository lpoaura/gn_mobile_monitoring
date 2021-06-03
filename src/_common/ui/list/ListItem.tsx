import React, { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { ColorsTheme } from "../Colors.theme";

type Props = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  odd?: boolean;
}>;

export function ListItem(props: Props) {
  return <View style={[styles.container, props.odd ? styles.odd : undefined, props.style]}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  odd: {
    backgroundColor: ColorsTheme.secondaryLight,
  },
});
