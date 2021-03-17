import React from "react";
import { Module } from "./_models/Modules.model";
import { Text, View } from "react-native";

type Props = {
  module: Module;
};

export function ModuleItem(props: Props) {
  return (
    <View>
      <Text>{props.module.module_label}</Text>
    </View>
  );
}
