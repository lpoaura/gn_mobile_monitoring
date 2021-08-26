import { LoadingState, LoadingStatus } from "../../_common/loadings/_models/LoadingState.model";
import { loadingUtils } from "../../_common/loadings/_utils/Loading.utils";
import { fetchUtils } from "../../_common/_utils/Fetch.utils";
import { action, IObservableArray, observable } from "mobx";
import { ModuleConfigResponse } from "../_models/ModuleConfig.model";
import { Resource, ResourceResponse } from "../../resources/_model/ResourceResponse.model";
import { instancesService } from "../../instances/_services/Instances.service";

export type ResourcePath = { resourceId: number; resourceType: string }[];

type ResourceState = {
  loadingState: LoadingState;
  resources: IObservableArray<Resource>;
  parent?: Resource;
};

type ResourcesByParents = Record<number /* parent id */, ResourceState>;

export class ModuleService {
  readonly moduleCode: string;

  readonly loadingState = new LoadingState();
  readonly configLoadingState = new LoadingState<ModuleConfigResponse>();
  readonly module = observable.box<ResourceResponse>();

  readonly resources = observable<Record<string /* type */, Record<number /* id */, Resource>>>({});
  readonly resourcesChildren = observable<Record<string, ResourcesByParents>>({});

  constructor(moduleCode: string) {
    this.moduleCode = moduleCode;
  }

  getResource(resourceType: string, resourceId: number) {
    return this.resources[resourceType]?.[resourceId];
  }

  getResourceConfig(resourceType: string) {
    return this.configLoadingState.value?.[resourceType];
  }

  getResourcesChildren(childrenResourceType: string, parentResourceId: number) {
    return this.resourcesChildren[childrenResourceType]?.[parentResourceId]?.resources;
  }

  loadConfig() {
    return loadingUtils.fromPromise(
      () =>
        fetchUtils
          .get<ModuleConfigResponse>(`${instancesService.instance.apiUrl}/monitorings/config/${this.moduleCode}`)
          .then(({ data }) => data),
      this.configLoadingState,
    );
  }

  loadModule() {
    return this.loadResourceWithChildren("module");
  }

  loadResourceChildren(resourceType: string, resourceId: number) {
    return this.loadResourceWithChildren(resourceType, resourceId);
  }

  saveResource(parentId: number, resourceType: string, properties: any) {
    return fetchUtils
      .post<Resource>(`${instancesService.instance.apiUrl}/monitorings/object/${this.moduleCode}/${resourceType}`, {
        id_parent: parentId,
        properties,
      })
      .then(
        ({ data }) => {
          if (this.resourcesChildren[resourceType][parentId]) {
            this.resourcesChildren[resourceType][parentId].resources.push(data);
          }
          return data;
        },
        err => {
          console.error("ModuleService.saveResource", err);
          throw err;
        },
      );
  }

  private loadResourceWithChildren = action((resourceType: string, resourceId?: number) => {
    const isRootResource = resourceType === "module";
    if (!isRootResource && !this.resourcesChildren[resourceType]?.[resourceId!]) {
      this.resourcesChildren[resourceType] = this.resourcesChildren[resourceType] ?? {};
      this.resourcesChildren[resourceType][resourceId!] = {
        loadingState: new LoadingState(),
        resources: observable.array([]),
      };
    }

    const url = `${instancesService.instance.apiUrl}/monitorings/object/${this.moduleCode}/${resourceType}${
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
