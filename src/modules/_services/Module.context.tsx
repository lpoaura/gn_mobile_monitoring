import React, { useContext } from "react";
import { ModuleService } from "./Module.service";

const ModuleServiceCtxt = React.createContext<ModuleService>(
  {} as ModuleService,
);

type Props = {
  moduleService: ModuleService;
};

export function useModuleService() {
  return useContext(ModuleServiceCtxt);
}

export function ModuleServiceContext(props: React.PropsWithChildren<Props>) {
  return (
    <ModuleServiceCtxt.Provider value={props.moduleService}>
      {props.children}
    </ModuleServiceCtxt.Provider>
  );
}
