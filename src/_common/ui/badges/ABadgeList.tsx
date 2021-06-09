import React from "react";
import { StyleSheet, View } from "react-native";
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
          <ABadge label={label} onClick={() => props.onClick?.(key)} />
        </View>
      ))}
      {props.onAdd && (
        <View style={styles.badge}>
          <ABadge label="Ajouter" onClick={() => props.onAdd?.()} />
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
