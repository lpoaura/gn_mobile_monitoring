import React, { PropsWithChildren } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

type Props = {
  padding?: string | number;
  noScroll?: boolean;
};

export function Screen(props: PropsWithChildren<Props>) {
  const style = { padding: props.padding };
  return (
    <SafeAreaView>
      {props.noScroll ? (
        <View style={style}>{props.children}</View>
      ) : (
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={style}>
          {props.children}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
