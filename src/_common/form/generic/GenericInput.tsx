import React from "react";
import { ResourceConfigGeneric } from "../../_models/ResourceConfig.model";
import { View } from "react-native";
import { AText } from "../../ui/text/AText";

type Props = {
  config: ResourceConfigGeneric;
};

export function GenericInput(props: Props) {
  return (
    <View>
      <AText>{props.config.attribut_label}</AText>
    </View>
  );
}
