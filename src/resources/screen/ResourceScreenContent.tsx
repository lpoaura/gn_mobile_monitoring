import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { ModuleRoute, ModuleStackParamList } from "../../_configs/RoutesConfig";
import { LoaderObservable } from "../../_common/loadings/LoaderObservable";
import { ResourcesList } from "../list/ResourcesList";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import _ from "lodash";
import { useModuleService } from "../../modules/_services/Module.context";
import { AText } from "../../_common/ui/text/AText";
import { ColorsTheme } from "../../_common/ui/Colors.theme";
import Icon from "react-native-vector-icons/Feather";

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

  if (!childResourceType) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <AText theme="title_big" color={ColorsTheme.secondary}>
          {moduleService.configLoadingState.value?.[childResourceType]?.label.toLowerCase()}s
        </AText>
        <Icon
          name="plus-square"
          onPress={() => navigation.navigate(ModuleRoute.resourceForm, route.params)}
          size={30}
          color={ColorsTheme.secondary}
        />
      </View>
      <LoaderObservable loadingState={loadCallback()} onRetry={loadCallback}>
        <ResourcesList navigationTree={isRootResource ? undefined : route.params.tree} />
      </LoaderObservable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
