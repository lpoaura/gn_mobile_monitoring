import React from "react";
import { ACard } from "../../_common/ui/card/ACard";
import { AText } from "../../_common/ui/text/AText";
import { useNavigation } from "@react-navigation/native";
import { ModuleRoute } from "../../_configs/RoutesConfig";
import { TouchableRipple } from "react-native-paper";
import { SiteVisit } from "../../sites/_models/Site.model";

type Props = {
  visit: SiteVisit;
};
export function VisitItem(props: Props) {
  const navigation = useNavigation();

  return (
    <TouchableRipple
      onPress={() =>
        navigation.navigate(ModuleRoute.visit, {
          visitId: props.visit.id,
        })
      }
    >
      <ACard style={{ marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
        <AText theme="h3">{props.visit.properties.visit_date_min}</AText>
        <AText theme="small">
          {props.visit.properties.snow_removal}% déneigement
        </AText>
      </ACard>
    </TouchableRipple>
  );
}
