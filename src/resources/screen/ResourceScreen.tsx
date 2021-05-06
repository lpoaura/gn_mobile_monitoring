import React, { useCallback } from "react";
import { Screen } from "../../_common/ui/Screen";
import { LoaderObservable } from "../../_common/loadings/LoaderObservable";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ModuleRoute, ModuleStackParamList } from "../../_configs/RoutesConfig";
import { useModuleService } from "../../modules/_services/Module.context";
import _ from "lodash";
import { ResourcesList } from "../list/ResourcesList";
import { Button } from "react-native";

type ResourceScreenRouteProp = RouteProp<ModuleStackParamList, ModuleRoute.resource>;

export function ResourceScreen() {
  const navigation = useNavigation();
  const route = useRoute<ResourceScreenRouteProp>();
  const moduleService = useModuleService();
  const lastResource = _.last(route.params?.tree);
  const resourceType = lastResource?.resourceType ?? "module";
  const resourceId = lastResource?.resourceId;
  const isRootResource = resourceType === "module";

  const loadCallback = useCallback(
    () => (resourceId ? moduleService.loadResourceChildren(resourceType, resourceId) : moduleService.loadModule()),
    [resourceType, resourceId, moduleService],
  );

  return (
    <Screen padding={20}>
      <LoaderObservable loadingState={moduleService.loadConfig()} onRetry={() => moduleService.loadConfig()}>
        <Button title="Ajouter" onPress={() => navigation.navigate(ModuleRoute.resourceForm, route.params)} />
        <LoaderObservable loadingState={loadCallback()} onRetry={loadCallback}>
          {(!isRootResource || moduleService.module) && (
            <ResourcesList
              navigationTree={
                isRootResource
                  ? [
                      {
                        resourceType: "module",
                        resourceId: moduleService.module!.id,
                      },
                    ]
                  : route.params.tree
              }
            />
          )}
        </LoaderObservable>
      </LoaderObservable>
    </Screen>
  );
}
