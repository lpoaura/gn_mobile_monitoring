import type { ReactElement } from "react";
import React from "react";
import { LogBox, StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "./auth/LoginScreen";
import { ModulesScreen } from "./modules/ModulesScreen";
import { ModuleScreen } from "./modules/screen/ModuleScreen";
import { Route } from "./_configs/RoutesConfig";
import { ColorsTheme } from "./_common/ui/Colors.theme";

LogBox.ignoreLogs(["Require cycle:"]);

const Stack = createStackNavigator();

const App: () => ReactElement = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <StatusBar backgroundColor={ColorsTheme.secondaryDark} />
        <Stack.Navigator
          initialRouteName={Route.login}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name={Route.login} component={LoginScreen} />
          <Stack.Screen name={Route.modules} component={ModulesScreen} />
          <Stack.Screen name={Route.module} component={ModuleScreen} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
