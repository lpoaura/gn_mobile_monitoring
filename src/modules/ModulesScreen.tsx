import React from "react";
import { observer } from "mobx-react-lite";
import { userService } from "../auth/_services/User.service";
import { LoaderObservable } from "../_common/loadings/LoaderObservable";
import { modulesService } from "./_services/Modules.service";
import { ModulesList } from "./list/ModulesList";
import { Screen } from "../_common/ui/Screen";

export const ModulesScreen = observer(() => {
  if (!userService.user.get()) {
    return null;
  }

  return (
    <Screen padding={10}>
      <LoaderObservable loadingState={modulesService.load()} onRetry={() => modulesService.load()}>
        <ModulesList />
      </LoaderObservable>
    </Screen>
  );
});
