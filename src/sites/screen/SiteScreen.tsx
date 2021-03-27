import React from "react";
import { Screen } from "../../_common/ui/Screen";
import { LoaderObservable } from "../../_common/loadings/LoaderObservable";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ModuleRoute, ModuleStackParamList } from "../../_configs/RoutesConfig";
import { useModuleService } from "../../modules/_services/Module.context";
import { VisitsList } from "../../visits/list/VisitsList";

type SiteScreenRouteProp = RouteProp<ModuleStackParamList, ModuleRoute.site>;

export function SiteScreen() {
  const route = useRoute<SiteScreenRouteProp>();
  const moduleService = useModuleService();
  return (
    <Screen padding={20}>
      <LoaderObservable
        loadingState={moduleService.loadSite(route.params.siteId)}
        onRetry={() => moduleService.loadSite(route.params.siteId)}
      >
        <VisitsList siteId={route.params.siteId} />
      </LoaderObservable>
    </Screen>
  );
}
