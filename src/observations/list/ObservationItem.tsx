import React from "react";
import { ACard } from "../../_common/ui/card/ACard";
import { AText } from "../../_common/ui/text/AText";
import { VisitObservation } from "../../visits/_models/Visit.model";

type Props = {
  observation: VisitObservation;
};
export function ObservationItem(props: Props) {
  return (
    <ACard style={{ marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
      <AText theme="h3">{props.observation.properties.cd_nom}</AText>
      <AText theme="small">{props.observation.properties.nb_5_10}</AText>
    </ACard>
  );
}
