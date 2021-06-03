import React, { ComponentProps } from "react";
import { ColorsTheme } from "../Colors.theme";
import { StyleSheet, TextInput } from "react-native";

export function ATextInput(props: ComponentProps<typeof TextInput> & { color?: string }) {
  return (
    <TextInput
      {...props}
      style={[styles.container, props.style, { color: props.color ?? ColorsTheme.textOnPrimary }]}
      selectionColor={ColorsTheme.primary}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    fontFamily: "Karla-Bold",
    backgroundColor: "rgba(0, 0, 0, .1)",
    paddingLeft: 30,
    paddingRight: 30,
  },
});
