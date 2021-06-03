import React from "react";
import { Screen } from "../../_common/ui/Screen";
import { LoaderObservable } from "../../_common/loadings/LoaderObservable";
import { useModuleService } from "../../modules/_services/Module.context";
import { ResourceScreenContent } from "./ResourceScreenContent";

export function ResourceScreen() {
  const moduleService = useModuleService();
  return (
    <Screen noScroll>
      <LoaderObservable loadingState={moduleService.loadConfig()} onRetry={() => moduleService.loadConfig()}>
        <ResourceScreenContent />
      </LoaderObservable>
    </Screen>
  );
}
