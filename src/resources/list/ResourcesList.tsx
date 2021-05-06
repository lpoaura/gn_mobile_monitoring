import React from "react";
import { useModuleService } from "../../modules/_services/Module.context";
import { FlatList } from "react-native";
import { observer } from "mobx-react-lite";
import { ResourcesNavigationTree } from "../../_configs/RoutesConfig";
import _ from "lodash";
import { ResourceItem } from "./ResourceItem";
import { Resource } from "../_model/ResourceResponse.model";

type Props = {
  navigationTree: ResourcesNavigationTree;
};

export const ResourcesList = observer((props: Props) => {
  const moduleService = useModuleService();
  const lastResource = _.last(props.navigationTree);
  if (!lastResource) {
    return null;
  }
  const childResourceType = moduleService.configLoadingState.value?.[lastResource.resourceType]?.children_types?.[0];
  if (!childResourceType) {
    return null;
  }
  const resourcesChildren = moduleService.getResourcesChildren(childResourceType, lastResource.resourceId);
  if (!resourcesChildren) {
    return null;
  }

  return (
    <FlatList<Resource>
      data={resourcesChildren}
      keyExtractor={resource => resource.id.toString()}
      renderItem={item => <ResourceItem resource={item.item} navigationTree={props.navigationTree} />}
    />
  );
});
