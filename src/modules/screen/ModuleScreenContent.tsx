import React from "react";
import { AText } from "../../_common/ui/text/AText";
import { Screen } from "../../_common/ui/Screen";
import { SitesListLoader } from "../../sites/list/SitesListLoader";
import { useModuleService } from "../_services/Module.context";

export function ModuleScreenContent() {
  const moduleService = useModuleService();
  return (
    <Screen padding={20}>
      <AText style={{ marginBottom: 20 }}>{moduleService.moduleCode}</AText>
      <SitesListLoader />
    </Screen>
  );
}
