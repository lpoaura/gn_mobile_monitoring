import React from "react";
import { observer } from "mobx-react-lite";
import { userService } from "../auth/_services/User.service";
import { LoaderObservable } from "../_common/loadings/LoaderObservable";
import { modulesService } from "./_services/Modules.service";
import { ModulesList } from "./list/ModulesList";
import { Screen } from "../_common/ui/Screen";
import { AText } from "../_common/ui/text/AText";
import { ColorsTheme } from "../_common/ui/Colors.theme";
import { StyleSheet, View } from "react-native";

export const ModulesScreen = observer(() => {
  if (!userService.user.get()) {
    return null;
  }

  return (
    <Screen noScroll>
      <View style={styles.titleContainer}>
        <AText theme="title_big" color={ColorsTheme.secondary}>
          modules
        </AText>
      </View>
      <LoaderObservable loadingState={modulesService.load()} onRetry={() => modulesService.load()}>
        <ModulesList />
      </LoaderObservable>
    </Screen>
  );
});

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 20,
    paddingLeft: 10,
    marginBottom: 20,
  },
});
