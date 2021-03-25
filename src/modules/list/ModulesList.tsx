import React from "react";
import { FlatList } from "react-native";
import { observer } from "mobx-react-lite";
import { modulesService } from "../_services/Modules.service";
import { ModuleItem } from "./ModuleItem";

export const ModulesList = observer(() => {
  return (
    <FlatList
      data={modulesService.modules}
      keyExtractor={module => module.id_module.toString()}
      renderItem={item => <ModuleItem module={item.item} />}
    />
  );
});
