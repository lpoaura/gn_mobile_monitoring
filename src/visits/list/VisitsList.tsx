import React from "react";
import { useModuleService } from "../../modules/_services/Module.context";
import { View } from "react-native";
import { VisitItem } from "./VisitItem";
import { observer } from "mobx-react-lite";

type Props = {
  siteId: number;
};

export const VisitsList = observer((props: Props) => {
  const moduleService = useModuleService();
  const visits = moduleService.visits[props.siteId];
  if (!visits) {
    return null;
  }
  return (
    <View>
      {visits.map(visit => (
        <VisitItem key={visit.id} visit={visit} />
      ))}
    </View>
  );
});
