import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function Spinner() {
  return (
    <View style={styles.container}>
      <Text>chargement en cours...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
