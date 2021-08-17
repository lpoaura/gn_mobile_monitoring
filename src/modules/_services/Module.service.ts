import { LoadingState, LoadingStatus } from "../../_common/loadings/_models/LoadingState.model";
import { loadingUtils } from "../../_common/loadings/_utils/Loading.utils";
import { fetchUtils } from "../../_common/_utils/Fetch.utils";
import { appConfig } from "../../_configs/appConfig";
import { action, IObservableArray, observable } from "mobx";
import { ModuleConfigResponse } from "../_models/ModuleConfig.model";
import { Resource, ResourceResponse } from "../../resources/_model/ResourceResponse.model";

export type ResourcePath = { resourceId: number; resourceType: string }[];

type ResourceState = {
  loadingState: LoadingState;
  resources: IObservableArray<Resource>;
  parent?: Resource;
};

type ResourcesByParents = Record<number /* parent id */, ResourceState>;

export class ModuleService {
  moduleCode: string;
  loadingState = new LoadingState();
  configLoadingState = new LoadingState<ModuleConfigResponse>();
  module = observable.box<ResourceResponse>();

  resourcesChildren = observable<Record<string, ResourcesByParents>>({});
  resources = observable<Record<string, Record<number /* id */, Resource>>>({});

  constructor(moduleCode: string) {
    this.moduleCode = moduleCode;
  }

  getResourcesChildren(resourceType: string, resourceId: number) {
    return this.resourcesChildren[resourceType]?.[resourceId]?.resources;
  }

  loadConfig() {
    return loadingUtils.fromPromise(
      () =>
        fetchUtils
          .get<ModuleConfigResponse>(`${appConfig.apiUrl}/monitorings/config/${this.moduleCode}`)
          .then(({ data }) => data),
      this.configLoadingState,
    );
  }

  loadModule() {
    return this.loadResource("module");
  }

  loadResourceChildren(resourceType: string, resourceId: number) {
    return this.loadResource(resourceType, resourceId);
  }

  getResource(resourceType: string, resourceId: number) {
    return this.resources[resourceType]?.[resourceId];
  }

  getResourceConfig(resourceType: string) {
    return this.configLoadingState.value?.[resourceType];
  }

  saveResource<T>(parentId: number, resourceType: string, properties: any) {
    return fetchUtils
      .post<T>(`${appConfig.apiUrl}/monitorings/object/${this.moduleCode}/${resourceType}`, {
        id_parent: parentId,
        properties,
      })
      .then(({ data }) => data);
  }

  private loadResource = action((resourceType: string, resourceId?: number) => {
    const isRootResource = resourceType === "module";
    if (!isRootResource && !this.resourcesChildren[resourceType]?.[resourceId!]) {
      this.resourcesChildren[resourceType] = this.resourcesChildren[resourceType] ?? {};
      this.resourcesChildren[resourceType][resourceId!] = {
        loadingState: new LoadingState(),
        resources: observable.array([]),
      };
    }

    const url = `${appConfig.apiUrl}/monitorings/object/${this.moduleCode}/${resourceType}${
      isRootResource ? "" : `/${resourceId}`
    }?depth=1`;

    return loadingUtils.fromPromise(
      () =>
        fetchUtils.get<ResourceResponse>(url).then(
          action(({ data }) => {
            if (isRootResource) {
              this.module.set(data);
            }
            if (resourceId !== undefined) {
              this.resources[resourceType] = this.resources[resourceType] ?? {};
              this.resources[resourceType][resourceId] = data;
            }
            const childrenResources = Object.entries(data.children);
            for (const [childResourceType, childResources] of childrenResources) {
              for (const childResource of childResources) {
                this.resources[childResourceType] = this.resources[childResourceType] ?? {};
                this.resources[childResourceType][childResource.id] = childResource;
              }
              this.resourcesChildren[childResourceType] = this.resourcesChildren[childResourceType] ?? {};
              this.resourcesChildren[childResourceType][data.id] = {
                loadingState: new LoadingState(LoadingStatus.SUCCEEDED),
                resources: observable.array(childResources),
                parent: data,
              };
            }
          }),
        ),
      isRootResource ? this.loadingState : this.resourcesChildren[resourceType][resourceId!].loadingState,
    );
  });
}
