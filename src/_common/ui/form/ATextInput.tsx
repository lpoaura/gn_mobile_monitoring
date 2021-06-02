import React, { ComponentProps } from "react";
import { ColorsTheme } from "../Colors.theme";
import { TextInput } from "react-native";

export function ATextInput(props: ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      style={{ backgroundColor: "red", borderRadius: 50, padding: "offset" }}
      selectionColor={ColorsTheme.primary}
      {...props}
    />
  );
}
