import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ModuleRoute, ModuleStackParamList } from "../../_configs/RoutesConfig";
import { AText } from "../../_common/ui/text/AText";
import { ColorsTheme } from "../../_common/ui/Colors.theme";
import { useModuleService } from "../../modules/_services/Module.context";

type ResourceScreenRouteProp = RouteProp<ModuleStackParamList, ModuleRoute.resource>;

export function ResourceBreadcrumb() {
  const moduleService = useModuleService();
  const route = useRoute<ResourceScreenRouteProp>();
  const tree = route.params?.tree ?? [];
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {tree.map(({ resourceId, resourceType }, index) => {
        const resource = moduleService.getResource(resourceType, resourceId);
        const resourceConfig = moduleService.getResourceConfig(resourceType);
        const label = resourceConfig?.description_field_name
          ? resource?.properties[resourceConfig.description_field_name]
          : undefined;
        return (
          <View key={resourceType} style={styles.path}>
            <TouchableOpacity
              onPress={() => {
                if (index < tree.length - 1) {
                  (navigation as any).pop(tree.length - 1 - index);
                }
              }}
            >
              <AText color={ColorsTheme.secondaryLight}>{label ?? "-"}</AText>
            </TouchableOpacity>
            {index < tree.length - 1 && (
              <AText style={styles.separator} color={ColorsTheme.secondaryLight}>
                {">"}
              </AText>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    padding: 10,
  },
  path: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  separator: {
    opacity: 0.5,
    marginHorizontal: 6,
    fontSize: 12,
  },
});
