import { LoadingState, LoadingStatus } from "../../_common/loadings/_models/LoadingState.model";
import { loadingUtils } from "../../_common/loadings/_utils/Loading.utils";
import { fetchUtils } from "../../_common/_utils/Fetch.utils";
import { appConfig } from "../../_configs/appConfig";
import { action, IObservableArray, observable } from "mobx";
import { ModuleConfigResponse } from "../_models/ModuleConfig.model";
import { Resource, ResourceResponse } from "../../resources/_model/ResourceResponse.model";

type ResourceState = {
  loadingState: LoadingState;
  resources: IObservableArray<Resource>;
};

type ResourcesByParents = Record<number /* parent id*/, ResourceState>;

export class ModuleService {
  moduleCode: string;
  loadingState = new LoadingState();
  configLoadingState = new LoadingState<ModuleConfigResponse>();
  module = observable.box<ResourceResponse>();

  resources = observable<Record<string, ResourcesByParents>>({});

  constructor(moduleCode: string) {
    this.moduleCode = moduleCode;
  }

  getResourcesChildren(resourceType: string, resourceId: number) {
    return this.resources[resourceType]?.[resourceId]?.resources;
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

  saveResource<T>(parentId: number, resourceType: string, properties: any) {
    return fetchUtils
      .post<T>(`${appConfig.apiUrl}/monitorings/object/${this.moduleCode}/${resourceType}`, {
        id_parent: parentId,
        properties,
      })
      .then(({ data }) => data);
  }

  private loadResource = action((resourceType: string, resourceId?: number) => {
    const isRootResource = resourceId === undefined;
    if (!isRootResource && !this.resources[resourceType]?.[resourceId!]) {
      this.resources[resourceType] = this.resources[resourceType] ?? {};
      this.resources[resourceType][resourceId!] = {
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
            const childrenResources = Object.entries(data.children);
            for (const [childResourceType, childResources] of childrenResources) {
              this.resources[childResourceType] = this.resources[childResourceType] ?? {};
              this.resources[childResourceType][data.id] = {
                loadingState: new LoadingState(LoadingStatus.SUCCEEDED),
                resources: observable.array(childResources),
              };
            }
          }),
        ),
      isRootResource ? this.loadingState : this.resources[resourceType][resourceId!].loadingState,
    );
  });
}
