import React, { PropsWithChildren } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

type Props = {
  padding?: string | number;
  noScroll?: boolean;
  color?: string;
};

export function Screen(props: PropsWithChildren<Props>) {
  const style = { padding: props.padding, flex: 1 };
  return (
    <SafeAreaView style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
