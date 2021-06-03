import React, { PropsWithChildren } from "react";
import { NativeSyntheticEvent, NativeTouchEvent, StyleSheet, TouchableOpacity } from "react-native";
import { AText } from "../text/AText";
import { ColorsTheme } from "../Colors.theme";

type Props = {
  disabled?: boolean;
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  theme?: "primary" | "secondary";
};

export function AButton(props: PropsWithChildren<Props>) {
  const textColor = props.disabled
    ? ColorsTheme.textOnDisabled
    : props.theme === "primary"
    ? ColorsTheme.textOnPrimary
    : ColorsTheme.textOnSecondary;
  return (
    <TouchableOpacity
      style={[
        styles.container,
        props.theme === "primary" ? styles.primary : styles.secondary,
        props.disabled ? styles.disabled : undefined,
      ]}
      onPress={props.onPress}
    >
      <AText color={textColor} theme="button">
        {props.children}
      </AText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    padding: 12,
    alignItems: "center",
    elevation: 8,
  },
  primary: {
    backgroundColor: ColorsTheme.primary,
  },
  secondary: {
    backgroundColor: ColorsTheme.secondary,
  },
  disabled: {
    backgroundColor: ColorsTheme.buttonDisabled,
    elevation: 2,
  },
});
