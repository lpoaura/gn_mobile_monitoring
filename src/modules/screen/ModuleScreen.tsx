import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ModuleRoute, RootStackParamList, Route } from "../../_configs/RoutesConfig";
import { modulesRootService } from "../_services/ModulesRoot.service";
import { ModuleServiceContext } from "../_services/Module.context";
import { createStackNavigator } from "@react-navigation/stack";
import { ResourceScreen } from "../../resources/screen/ResourceScreen";
import { ResourceFormScreen } from "../../resources/screen/ResourceFormScreen";

type ModuleScreenRouteProp = RouteProp<RootStackParamList, Route.module>;
const Stack = createStackNavigator();

export function ModuleScreen() {
  const route = useRoute<ModuleScreenRouteProp>();
  const moduleService = modulesRootService.getModule(route.params.moduleCode);
  return (
    <ModuleServiceContext moduleService={moduleService}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={ModuleRoute.index}>
        <Stack.Screen name={ModuleRoute.index} component={ResourceScreen} />
        <Stack.Screen name={ModuleRoute.resource} component={ResourceScreen} />
        <Stack.Screen name={ModuleRoute.resourceForm} component={ResourceFormScreen} />
      </Stack.Navigator>
    </ModuleServiceContext>
  );
}
