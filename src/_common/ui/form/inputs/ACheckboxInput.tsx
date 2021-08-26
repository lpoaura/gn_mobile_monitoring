import React, { ComponentProps } from "react";
import { Checkbox } from "react-native-paper";

export type ACheckboxInputProps = ComponentProps<typeof Checkbox>;

export function ACheckboxInput(props: ACheckboxInputProps) {
  return <Checkbox {...props} />;
}
