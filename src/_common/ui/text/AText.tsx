import React, { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

type Props = {
  style?: StyleProp<TextStyle>;
  theme?: "logo" | "h1" | "h2" | "h3" | "normal" | "small" | "title" | "info" | "title_big" | "button";
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
    fontSize: 45,
    fontFamily: "Karla-ExtraBold",
    letterSpacing: -2,
  },
  h1: {},
  h2: {},
  h3: {
    fontSize: 16,
    fontFamily: "Karla-ExtraBold",
  },
  normal: {},
  title: {
    fontFamily: "Karla-ExtraBold",
    fontSize: 22,
  },
  title_big: {
    fontFamily: "Karla-ExtraBold",
    fontSize: 26,
  },
  small: {
    fontSize: 12,
    opacity: 0.8,
  },
  button: {
    fontFamily: "Karla-Bold",
    fontSize: 14,
  },
  info: {
    fontStyle: "italic",
    fontFamily: "Karla",
    fontSize: 14,
  },
});
