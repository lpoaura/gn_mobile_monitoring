import React from "react";
import { View } from "react-native";
import { observer } from "mobx-react-lite";
import { userService } from "../auth/_services/User.service";
import { LoaderObservable } from "../_common/loadings/LoaderObservable";
import { modulesService } from "./_services/Modules.service";
import { ModulesList } from "./ModulesList";

export const ModulesScreen = observer(() => {
  if (!userService.user.get()) {
    return null;
  }

  return (
    <View>
      <LoaderObservable
        loadingState={modulesService.load()}
        onRetry={() => modulesService.load()}
      >
        <ModulesList />
      </LoaderObservable>
    </View>
  );
});
