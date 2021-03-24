export enum Route {
  login = "login",
  modules = "modules",
  module = "module",
}

export type RootStackParamList = {
  login: undefined;
  modules: undefined;
  module: { moduleId: object };
};
