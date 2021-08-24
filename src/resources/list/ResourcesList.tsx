import React from "react";
import { useModuleService } from "../../modules/_services/Module.context";
import { FlatList, StyleSheet, View } from "react-native";
import { observer } from "mobx-react-lite";
import { ResourcesNavigationTree } from "../../_configs/RoutesConfig";
import _ from "lodash";
import { ResourceItem } from "./ResourceItem";
import { Resource } from "../_model/ResourceResponse.model";
import { AText } from "../../_common/ui/text/AText";
import { ColorsTheme } from "../../_common/ui/Colors.theme";

type Props = {
  navigationTree?: ResourcesNavigationTree;
};

export const ResourcesList = observer((props: Props) => {
  const moduleService = useModuleService();
  const module = moduleService.module.get();
  if (!module) {
    return null;
  }
  const lastResource = _.last(props.navigationTree) ?? {
    resourceType: "module",
    resourceId: module.id,
  };
  const childResourceType = moduleService.configLoadingState.value?.[lastResource.resourceType]?.children_types?.[0];
  if (!childResourceType) {
    return null;
  }
  const resourcesChildren = moduleService.getResourcesChildren(childResourceType, lastResource.resourceId);

  if (!resourcesChildren || resourcesChildren.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <AText theme="info" color={ColorsTheme.textOnBackground}>
          Aucune donnée trouvée
        </AText>
      </View>
    );
  }

  return (
    <FlatList<Resource>
      data={resourcesChildren.slice()}
      keyExtractor={resource => resource.id.toString()}
      renderItem={item => (
        <ResourceItem resource={item.item} index={item.index} navigationTree={props.navigationTree ?? [lastResource]} />
      )}
    />
  );
});

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
});
