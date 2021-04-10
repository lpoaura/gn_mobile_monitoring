import React, { ReactNode } from "react";
import { GenericFormConfig } from "./_models/ResourceConfig.model";
import { View } from "react-native";
import { AText } from "../../text/AText";
import { GenericTextInput } from "./inputs/GenericTextInput";
import { GenericNumberInput } from "./inputs/GenericNumberInput";

type Props = {
  name: string;
  config: GenericFormConfig;
};

export function GenericInput(props: Props) {
  if (props.config.hidden || !props.config.type_widget) {
    return null;
  }

  let input: ReactNode = null;
  switch (props.config.type_widget) {
    case "text":
      input = <GenericTextInput name={props.name} config={props.config} />;
      break;
    case "number":
      input = <GenericNumberInput name={props.name} config={props.config} />;
      break;
  }

  return (
    <View>
      <AText>{props.config.attribut_label}</AText>
      {input}
    </View>
  );
}
