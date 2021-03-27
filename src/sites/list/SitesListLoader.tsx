import React from "react";
import { useModuleService } from "../../modules/_services/Module.context";
import { LoaderObservable } from "../../_common/loadings/LoaderObservable";
import { SitesList } from "./SitesList";

export function SitesListLoader() {
  const moduleService = useModuleService();
  return (
    <LoaderObservable
      loadingState={moduleService.loadModule()}
      onRetry={() => moduleService.loadModule()}
    >
      <LoaderObservable
        loadingState={moduleService.loadConfig()}
        onRetry={() => moduleService.loadConfig()}
      >
        <SitesList />
      </LoaderObservable>
    </LoaderObservable>
  );
}
