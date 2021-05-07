import React, { useCallback } from "react";
import { Button, View } from "react-native";
import { ModuleRoute, ModuleStackParamList } from "../../_configs/RoutesConfig";
import { LoaderObservable } from "../../_common/loadings/LoaderObservable";
import { ResourcesList } from "../list/ResourcesList";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import _ from "lodash";
import { useModuleService } from "../../modules/_services/Module.context";

type ResourceScreenRouteProp = RouteProp<ModuleStackParamList, ModuleRoute.resource>;

export function ResourceScreenContent() {
  const route = useRoute<ResourceScreenRouteProp>();
  const moduleService = useModuleService();
  const navigation = useNavigation();
  const lastResource = _.last(route.params?.tree);
  const resourceType = lastResource?.resourceType ?? "module";
  const resourceId = lastResource?.resourceId;
  const isRootResource = resourceType === "module";
  const childResourceType = moduleService.configLoadingState.value?.[resourceType]?.children_types?.[0];
  const loadCallback = useCallback(
    () => (resourceId ? moduleService.loadResourceChildren(resourceType, resourceId) : moduleService.loadModule()),
    [resourceType, resourceId, moduleService],
  );

  return (
    <View>
      <Button title="Ajouter" onPress={() => navigation.navigate(ModuleRoute.resourceForm, route.params)} />
      {childResourceType && (
        <LoaderObservable loadingState={loadCallback()} onRetry={loadCallback}>
          <ResourcesList navigationTree={isRootResource ? undefined : route.params.tree} />
        </LoaderObservable>
      )}
    </View>
  );
}
