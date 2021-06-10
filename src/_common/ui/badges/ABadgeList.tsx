import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ABadge } from "./ABadge";

type Props = {
  badges: { key: string; label: string }[];
  onClick?: (key: string) => void;
  onAdd?: () => void;
};

export function ABadgeList(props: Props) {
  return (
    <View style={styles.container}>
      {props.badges.map(({ key, label }) => (
        <View key={key} style={styles.badge}>
          <TouchableOpacity onPress={() => props.onClick?.(key)}>
            <ABadge label={label} theme="secondary" />
          </TouchableOpacity>
        </View>
      ))}
      {props.onAdd && (
        <View style={styles.badge}>
          <TouchableOpacity onPress={() => props.onAdd?.()}>
            <ABadge label="ajouter" theme="primary" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  badge: {
    marginRight: 5,
    marginBottom: 5,
  },
});
