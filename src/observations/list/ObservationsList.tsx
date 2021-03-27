import React from "react";
import { useModuleService } from "../../modules/_services/Module.context";
import { Button, View } from "react-native";
import { ObservationItem } from "./ObservationItem";
import { observer } from "mobx-react-lite";
import { useNavigation } from "@react-navigation/native";
import { ModuleRoute } from "../../_configs/RoutesConfig";

type Props = {
  visitId: number;
};

export const ObservationsList = observer((props: Props) => {
  const navigation = useNavigation();
  const moduleService = useModuleService();
  const observations = moduleService.observations[props.visitId];
  if (!observations) {
    return null;
  }
  return (
    <View>
      <Button
        title="Ajouter une observation"
        onPress={() =>
          navigation.navigate(ModuleRoute.observationForm, {
            visitId: props.visitId,
          })
        }
      />
      {observations.map(observation => (
        <ObservationItem key={observation.id} observation={observation} />
      ))}
    </View>
  );
});
