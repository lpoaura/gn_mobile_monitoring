import React, { PropsWithChildren } from "react";
import { SafeAreaView, ScrollView } from "react-native";

type Props = {
  padding?: string | number;
};

export function Screen(props: PropsWithChildren<Props>) {
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ padding: props.padding }}
      >
        {props.children}
      </ScrollView>
    </SafeAreaView>
  );
}
