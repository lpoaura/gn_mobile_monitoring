export enum Route {
  login = "login",
  modules = "modules",
  module = "module",
}

export type RootStackParamList = {
  login: undefined;
  modules: undefined;
  module: { moduleCode: string };
  site: { siteId: number };
  visit: { visitId: number };
};

export enum ModuleRoute {
  index = "index",
  site = "site",
  visit = "visit",
}

export type ModuleStackParamList = {
  index: undefined;
  site: { siteId: number };
  visit: { visitId: number };
};
