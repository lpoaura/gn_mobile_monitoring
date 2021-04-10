import React from "react";
import { View } from "react-native";
import { GenericForm } from "../../_common/ui/form/generic/GenericForm";
import { useModuleService } from "../../modules/_services/Module.context";
import { RouteProp } from "@react-navigation/native";
import { ModuleRoute, ModuleStackParamList } from "../../_configs/RoutesConfig";

type ObservationScreenRouteProp = RouteProp<
  ModuleStackParamList,
  ModuleRoute.observationForm
>;

export function ObservationFormScreen(_props: ObservationScreenRouteProp) {
  const moduleService = useModuleService();
  const config = moduleService.configLoadingState.value;
  if (!config) {
    return null;
  }
  return (
    <View>
      <GenericForm config={config.observation} />
    </View>
  );
}
