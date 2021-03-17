import type { ReactElement } from "react";
import React from "react";
import { SafeAreaView, ScrollView, StatusBar } from "react-native";
import { LoginScreen } from "./auth/LoginScreen";
import { ModulesScreen } from "./modules/ModulesScreen";

const App: () => ReactElement = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <LoginScreen />
        <ModulesScreen />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
