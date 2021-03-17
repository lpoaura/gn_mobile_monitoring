import React from "react";
import { Text, View } from "react-native";
import { observer } from "mobx-react-lite";
import { userService } from "../auth/_services/User.service";

export const ModulesScreen = observer(() => {
  if (!userService.user.get()) {
    return null;
  }
  return (
    <View>
      <Text>Modules</Text>
    </View>
  );
});
