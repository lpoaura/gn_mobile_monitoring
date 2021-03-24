import React from "react";
import { View } from "react-native";
import { AText } from "../_common/ui/text/AText";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList, Route } from "../_configs/RoutesConfig";

type ModuleScreenRouteProp = RouteProp<RootStackParamList, Route.module>;

export function ModuleScreen() {
  const route = useRoute<ModuleScreenRouteProp>();

  return (
    <View>
      <AText>Module Screen {route.params.moduleId}</AText>
    </View>
  );
}
