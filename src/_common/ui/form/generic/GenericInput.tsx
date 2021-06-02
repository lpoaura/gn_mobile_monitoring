import React, { ReactNode } from "react";
import { GenericFormConfig } from "./_models/GenericFormConfig.model";
import { View } from "react-native";
import { AText } from "../../text/AText";
import { GenericTextInput } from "./inputs/GenericTextInput";
import { GenericNumberInput } from "./inputs/GenericNumberInput";
import { GenericDateInput } from "./inputs/GenericDateInput";
import { GenericTimeInput } from "./inputs/GenericTimeInput";
import { GenericSelectInput } from "./inputs/GenericSelectInput";
import { GenericDataListInput } from "./inputs/GenericDataListInput";

type Props = {
  name: string;
  config: GenericFormConfig;
};

export function GenericInput(props: Props) {
  if (props.config.hidden || !props.config.type_widget) {
    return null;
  }

  let input: ReactNode;
  switch (props.config.type_widget) {
    case "text":
      input = <GenericTextInput name={props.name} config={props.config} />;
      break;
    case "number":
      input = <GenericNumberInput name={props.name} config={props.config} />;
      break;
    case "date":
      input = <GenericDateInput name={props.name} config={props.config} />;
      break;
    case "time":
      input = <GenericTimeInput name={props.name} config={props.config} />;
      break;
    case "select":
      input = <GenericSelectInput name={props.name} config={props.config} />;
      break;
    case "datalist":
      input = <GenericDataListInput name={props.name} config={props.config} />;
      break;
    default:
      input = <AText>Widget non supporté: {props.config.type_widget}</AText>;
  }

  return (
    <View>
      <AText>{props.config.attribut_label}</AText>
      {input}
    </View>
  );
}
