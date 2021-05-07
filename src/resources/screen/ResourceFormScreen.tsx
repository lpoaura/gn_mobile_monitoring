import React from "react";
import { View } from "react-native";
import { GenericForm } from "../../_common/ui/form/generic/GenericForm";
import { useModuleService } from "../../modules/_services/Module.context";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ModuleRoute, ModuleStackParamList } from "../../_configs/RoutesConfig";
import _ from "lodash";

type ResourceScreenRouteProp = RouteProp<ModuleStackParamList, ModuleRoute.resourceForm>;

export function ResourceFormScreen(_props: ResourceScreenRouteProp) {
  const moduleService = useModuleService();
  const config = moduleService.configLoadingState.value;
  const route = useRoute<ResourceScreenRouteProp>();
  const lastResource = _.last(route.params.tree);
  if (!lastResource) {
    return null;
  }
  const resourceConfig = config?.[lastResource.resourceType];
  if (!resourceConfig) {
    return null;
  }

  return (
    <View>
      <GenericForm config={resourceConfig} />
    </View>
  );
}