import React from "react";
import { Screen } from "../../_common/ui/Screen";
import { LoaderObservable } from "../../_common/loadings/LoaderObservable";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ModuleRoute, ModuleStackParamList } from "../../_configs/RoutesConfig";
import { useModuleService } from "../../modules/_services/Module.context";
import { ObservationsList } from "../../observations/list/ObservationsList";

type VisitScreenRouteProp = RouteProp<ModuleStackParamList, ModuleRoute.visit>;

export function VisitScreen() {
  const route = useRoute<VisitScreenRouteProp>();
  const moduleService = useModuleService();
  return (
    <Screen padding={20}>
      <LoaderObservable
        loadingState={moduleService.loadVisit(route.params.visitId)}
        onRetry={() => moduleService.loadVisit(route.params.visitId)}
      >
        <ObservationsList visitId={route.params.visitId} />
      </LoaderObservable>
    </Screen>
  );
}
