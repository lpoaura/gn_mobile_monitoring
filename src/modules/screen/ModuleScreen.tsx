import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  ModuleRoute,
  RootStackParamList,
  Route,
} from "../../_configs/RoutesConfig";
import { modulesRootService } from "../_services/ModulesRoot.service";
import { ModuleServiceContext } from "../_services/Module.context";
import { SiteScreen } from "../../sites/screen/SiteScreen";
import { VisitScreen } from "../../visits/screen/VisitScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { ModuleScreenContent } from "./ModuleScreenContent";

type ModuleScreenRouteProp = RouteProp<RootStackParamList, Route.module>;
const Stack = createStackNavigator();

export function ModuleScreen() {
  const route = useRoute<ModuleScreenRouteProp>();
  const moduleService = modulesRootService.getModule(route.params.moduleCode);
  return (
    <ModuleServiceContext moduleService={moduleService}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={ModuleRoute.index}
          component={ModuleScreenContent}
        />
        <Stack.Screen name={ModuleRoute.site} component={SiteScreen} />
        <Stack.Screen name={ModuleRoute.visit} component={VisitScreen} />
      </Stack.Navigator>
    </ModuleServiceContext>
  );
}
