import React from "react";
import { ModuleRoute, ResourcesNavigationTree } from "../../_configs/RoutesConfig";
import { useModuleService } from "../../modules/_services/Module.context";
import { Resource } from "../_model/ResourceResponse.model";
import { useNavigation } from "@react-navigation/native";
import { TouchableRipple } from "react-native-paper";
import { AText } from "../../_common/ui/text/AText";
import { ColorsTheme } from "../../_common/ui/Colors.theme";
import { ListItem } from "../../_common/ui/list/ListItem";
import { StyleSheet, View } from "react-native";
import _ from "lodash";

type Props = {
  navigationTree: ResourcesNavigationTree;
  resource: Resource;
  index?: number;
};

export function ResourceItem(props: Props) {
  const navigation = useNavigation();
  const moduleService = useModuleService();

  const resourceConfig = moduleService.configLoadingState.value?.[props.resource.object_type];
  if (!resourceConfig) {
    return null;
  }

  return (
    <TouchableRipple
      onPress={() => {
        const childResourceType =
          moduleService.configLoadingState.value?.[props.resource.object_type]?.children_types?.[0];
        if (!childResourceType) {
          return;
        }
        (navigation as any).push(ModuleRoute.resource, {
          tree: [
            ...props.navigationTree,
            {
              resourceType: props.resource.object_type,
              resourceId: props.resource.id,
            },
          ],
        });
      }}
    >
      <ListItem odd={!props.index || props.index % 2 === 0}>
        <View style={styles.content}>
          {_.chunk(resourceConfig.display_list, 2).map((row, index) => (
            <View key={index} style={styles.row}>
              {row.map(propertyKey => (
                <View key={propertyKey} style={styles.properties}>
                  <AText theme="small" color={ColorsTheme.textOnPrimary}>
                    {resourceConfig?.generic[propertyKey]?.attribut_label ??
                      resourceConfig?.specific[propertyKey]?.attribut_label}
                  </AText>
                  <AText theme="normal" color={ColorsTheme.textOnPrimary}>
                    {props.resource.properties[propertyKey] === "" || props.resource.properties[propertyKey] == null
                      ? "-"
                      : props.resource.properties[propertyKey]}
                  </AText>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ListItem>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  content: {
    marginLeft: -10,
    marginRight: -10,
    flex: 1,
  },
  row: {
    marginBottom: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  properties: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
});
