import React from "react";
import { Module } from "../_models/Modules.model";
import { ACard } from "../../_common/ui/card/ACard";
import { AText } from "../../_common/ui/text/AText";
import { useNavigation } from "@react-navigation/native";
import { Route } from "../../_configs/RoutesConfig";
import { TouchableRipple } from "react-native-paper";

type Props = {
  module: Module;
};
export function ModuleItem(props: Props) {
  const navigation = useNavigation();

  return (
    <TouchableRipple
      onPress={() =>
        navigation.navigate(Route.module, {
          moduleCode: props.module.module_code,
        })
      }
    >
      <ACard style={{ marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
        <AText theme="h3" style={{ marginBottom: 1 }}>
          {props.module.module_label}
        </AText>
        <AText theme="small">{props.module.module_desc}</AText>
      </ACard>
    </TouchableRipple>
  );
}
