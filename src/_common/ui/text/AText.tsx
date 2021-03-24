import React, { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

type Props = {
  style?: StyleProp<TextStyle>;
  theme?: "h1" | "h2" | "h3" | "normal" | "text2" | "small";
};

export function AText(props: PropsWithChildren<Props>) {
  return (
    <Text style={[styles[props.theme ?? "normal"], props.style]}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
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
