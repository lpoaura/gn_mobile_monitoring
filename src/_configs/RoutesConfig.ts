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
  site = "site",
  visit = "visit",
  observationForm = "observationForm",
}

export type ModuleStackParamList = {
  index: undefined;
  site: { siteId: number };
  visit: { visitId: number };
  observationForm: { visitId: number };
};
