import React from "react";
import { Module } from "../_models/Modules.model";
import { AText } from "../../_common/ui/text/AText";
import { useNavigation } from "@react-navigation/native";
import { Route } from "../../_configs/RoutesConfig";
import { TouchableRipple } from "react-native-paper";
import { ColorsTheme } from "../../_common/ui/Colors.theme";
import { ListItem } from "../../_common/ui/list/ListItem";
import { View } from "react-native";

type Props = {
  module: Module;
  index?: number;
};

export function ModuleItem(props: Props) {
  const navigation = useNavigation();

  return (
    <TouchableRipple
      onPress={() =>
        navigation.navigate(Route.module, {
          moduleCode: props.module.module_code,
          tree: [
            {
              resourceType: "module",
              resourceId: props.module.id_module,
            },
          ],
        })
      }
    >
      <ListItem odd={!props.index || props.index % 2 === 0}>
        <AText theme="h3" color={ColorsTheme.textOnPrimary}>
          {props.module.module_label}
        </AText>
        <View style={{ marginTop: 5, marginBottom: 5 }}>
          <AText theme="small" color={ColorsTheme.textOnPrimary}>
            {props.module.module_desc}
          </AText>
        </View>
      </ListItem>
    </TouchableRipple>
  );
}
