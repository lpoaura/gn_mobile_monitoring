import React from "react";
import { ModuleRoute, ResourcesNavigationTree } from "../../_configs/RoutesConfig";
import { useModuleService } from "../../modules/_services/Module.context";
import { Resource } from "../_model/ResourceResponse.model";
import { useNavigation } from "@react-navigation/native";
import { TouchableRipple } from "react-native-paper";
import { ACard } from "../../_common/ui/card/ACard";
import { AText } from "../../_common/ui/text/AText";

type Props = {
  navigationTree: ResourcesNavigationTree;
  resource: Resource;
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
      <ACard style={{ marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
        {resourceConfig.display_list.map(propertyKey => (
          <AText key={propertyKey} theme="small">
            {propertyKey}: {props.resource.properties[propertyKey]}
          </AText>
        ))}
        <AText>{props.resource.object_type}</AText>
      </ACard>
    </TouchableRipple>
  );
}
