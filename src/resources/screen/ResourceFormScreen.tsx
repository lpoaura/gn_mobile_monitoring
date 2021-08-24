import React from "react";
import { StyleSheet, View } from "react-native";
import { GenericForm } from "../../_common/ui/form/generic/GenericForm";
import { useModuleService } from "../../modules/_services/Module.context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ModuleRoute, ModuleStackParamList } from "../../_configs/RoutesConfig";
import _ from "lodash";
import { AText } from "../../_common/ui/text/AText";
import { ColorsTheme } from "../../_common/ui/Colors.theme";

type ResourceScreenRouteProp = RouteProp<ModuleStackParamList, ModuleRoute.resourceForm>;

export function ResourceFormScreen(_props: ResourceScreenRouteProp) {
  const navigation = useNavigation();
  const moduleService = useModuleService();
  const config = moduleService.configLoadingState.value;
  const route = useRoute<ResourceScreenRouteProp>();
  const lastResource = _.last(route.params?.tree);
  if (!lastResource) {
    return null;
  }
  const childResourceType = moduleService.configLoadingState.value?.[lastResource.resourceType]?.children_types?.[0];
  if (!childResourceType) {
    return null;
  }

  const resourceConfig = config?.[childResourceType];
  if (!resourceConfig) {
    return null;
  }

  return (
    <View style={styles.form}>
      <AText color={ColorsTheme.textOnBackground} theme="title" style={styles.header}>
        Ajout {resourceConfig.label.toLowerCase()}
      </AText>
      <GenericForm
        config={resourceConfig}
        onSubmit={data =>
          moduleService.saveResource(lastResource.resourceId, childResourceType, data).then(() => {
            (navigation as any).pop(1);
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    marginBottom: 20,
  },
  form: {
    padding: 10,
    flex: 1,
    backgroundColor: ColorsTheme.background,
  },
});
