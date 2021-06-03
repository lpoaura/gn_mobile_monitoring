import React from "react";
import { ModuleRoute, ResourcesNavigationTree } from "../../_configs/RoutesConfig";
import { useModuleService } from "../../modules/_services/Module.context";
import { Resource } from "../_model/ResourceResponse.model";
import { useNavigation } from "@react-navigation/native";
import { TouchableRipple } from "react-native-paper";
import { AText } from "../../_common/ui/text/AText";
import { ColorsTheme } from "../../_common/ui/Colors.theme";
import { ListItem } from "../../_common/ui/list/ListItem";

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
        navigation.navigate(ModuleRoute.resource, {
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
        {resourceConfig.display_list.map(propertyKey => (
          <AText key={propertyKey} theme="small" color={ColorsTheme.textOnPrimary}>
            {propertyKey}: {props.resource.properties[propertyKey]}
          </AText>
        ))}
        <AText>{props.resource.object_type}</AText>
      </ListItem>
    </TouchableRipple>
  );
}
