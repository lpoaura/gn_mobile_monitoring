import React, { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

type Props = {
  style?: StyleProp<TextStyle>;
  theme?: "logo" | "h1" | "h2" | "h3" | "normal" | "small";
  color?: string;
};

export function AText(props: PropsWithChildren<Props>) {
  return (
    <Text style={[styles.container, styles[props.theme ?? "normal"], { color: props.color ?? "#FFF" }, props.style]}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Karla-Regular",
  },
  logo: {
    fontSize: 48,
    fontFamily: "LibreBaskerville-Regular",
  },
  h1: {},
  h2: {},
  h3: {
    fontSize: 14,
    fontWeight: "bold",
  },
  normal: {},
  text2: {
    opacity: 0.8,
    fontWeight: "bold",
  },
  small: {
    fontSize: 12,
    opacity: 0.8,
  },
});
