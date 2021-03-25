import React from "react";
import { useModuleService } from "../../modules/_services/Module.context";
import { View } from "react-native";
import { ObservationItem } from "./ObservationItem";
import { observer } from "mobx-react-lite";

type Props = {
  visitId: number;
};

export const ObservationsList = observer((props: Props) => {
  const moduleService = useModuleService();
  const observations = moduleService.observations[props.visitId];
  if (!observations) {
    return null;
  }
  return (
    <View>
      {observations.map(observation => (
        <ObservationItem key={observation.id} observation={observation} />
      ))}
    </View>
  );
});
