import React, { ComponentProps } from "react";
import { TextInput } from "react-native-paper";
import { ATextInput } from "./ATextInput";

export function ANumberInput({
  allowFloat,
  allowNegative,
  onChangeText,
  ...props
}: ComponentProps<typeof TextInput> & {
  allowFloat?: boolean;
  allowNegative?: boolean;
}) {
  return (
    <ATextInput
      onChangeText={text => {
        let textSanitized = text.replace(/[^0-9,.]/g, "");

        let firstComma = true;
        textSanitized = textSanitized.replace(/[,.]/g, () => {
          if (allowFloat && firstComma) {
            firstComma = false;
            return ".";
          }
          return "";
        });

        if (text[0] === "-" && allowNegative) {
          textSanitized = "-" + textSanitized;
        }

        onChangeText?.(textSanitized);
      }}
      keyboardType="number-pad"
      {...props}
    />
  );
}
