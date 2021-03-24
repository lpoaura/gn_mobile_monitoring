import React, { ComponentProps } from "react";
import { TextInput } from "react-native-paper";

export function ATextInput(props: ComponentProps<typeof TextInput>) {
  return <TextInput {...props} />;
}
