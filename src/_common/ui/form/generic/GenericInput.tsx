import React, { ReactNode } from "react";
import { GenericFormConfig } from "./_models/GenericFormConfig.model";
import { StyleSheet, View } from "react-native";
import { AText } from "../../text/AText";
import { GenericTextInput } from "./inputs/GenericTextInput";
import { GenericNumberInput } from "./inputs/GenericNumberInput";
import { GenericDateInput } from "./inputs/GenericDateInput";
import { GenericTimeInput } from "./inputs/GenericTimeInput";
import { GenericSelectInput } from "./inputs/GenericSelectInput";
import { GenericDataListInput } from "./inputs/dataList/GenericDataListInput";
import { ColorsTheme } from "../../Colors.theme";
import { GenericNomenclatureInput } from "./inputs/nomenclature/GenericNomenclatureInput";
import { GenericCheckboxInput } from "./inputs/GenericCheckboxInput";

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
    case "nomenclature":
      input = <GenericNomenclatureInput name={props.name} config={props.config} />;
      break;
    case "bool_checkbox":
      input = <GenericCheckboxInput name={props.name} config={props.config} />;
      break;
    default:
      input = <AText color={ColorsTheme.textOnBackground}>Widget non supporté: {props.config.type_widget}</AText>;
  }

  return (
    <View style={styles.container}>
      <AText color={ColorsTheme.textOnBackground} style={styles.label}>
        {props.config.attribut_label}
        {props.config.required ? "*" : ""}
      </AText>
      {input}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
  },
});
