import React from "react";
import { useModuleService } from "../../modules/_services/Module.context";
import { View } from "react-native";
import { SiteItem } from "./SiteItem";

export function SitesList() {
  const moduleService = useModuleService();
  return (
    <View>
      {moduleService.sites.map(site => (
        <SiteItem key={site.id} site={site} />
      ))}
    </View>
  );
}
