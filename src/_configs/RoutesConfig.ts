export enum Route {
  login = "login",
  modules = "modules",
  module = "module",
}

export type RootStackParamList = {
  login: undefined;
  modules: undefined;
  module: { moduleCode: string };
};

export enum ModuleRoute {
  index = "index",
  resourceForm = "resourceForm",
  resource = "resource",
}

export type ResourcesNavigationTree = { resourceId: number; resourceType: string }[];

export type ModuleStackParamList = {
  index: undefined;
  resourceForm: {
    tree: ResourcesNavigationTree;
  };
  resource: {
    tree: ResourcesNavigationTree;
  };
};
