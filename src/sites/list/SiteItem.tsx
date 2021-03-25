import React from "react";
import { ACard } from "../../_common/ui/card/ACard";
import { AText } from "../../_common/ui/text/AText";
import { useNavigation } from "@react-navigation/native";
import { ModuleRoute, Route } from "../../_configs/RoutesConfig";
import { TouchableRipple } from "react-native-paper";
import { Site } from "../../modules/_models/Module.model";

type Props = {
  site: Site;
};
export function SiteItem(props: Props) {
  const navigation = useNavigation();

  return (
    <TouchableRipple
      onPress={() =>
        navigation.navigate(Route.module, {
          screen: ModuleRoute.site,
          params: {
            siteId: props.site.id,
          },
        })
      }
    >
      <ACard style={{ marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
        <AText theme="h3">{props.site.properties.base_site_name}</AText>
        <AText theme="small">
          {props.site.properties.nb_visits} visite
          {props.site.properties.nb_visits > 1 ? "s" : ""}
        </AText>
      </ACard>
    </TouchableRipple>
  );
}
