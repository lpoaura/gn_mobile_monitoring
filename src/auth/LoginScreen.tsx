import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { ATextInput } from "../_common/ui/form/ATextInput";
import { userService } from "./_services/User.service";
import { useNavigation } from "@react-navigation/native";
import { Screen } from "../_common/ui/Screen";
import { Route } from "../_configs/RoutesConfig";

export function LoginScreen() {
  const navigation = useNavigation();
  const [loginLoading, setLoginLoading] = useState<Promise<void>>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isDisabled = !!loginLoading;

  return (
    <Screen padding={30}>
      <View style={styles.container}>
        <ATextInput
          value={username}
          onChangeText={setUsername}
          editable={!isDisabled}
          autoCapitalize="none"
          autoCompleteType="username"
          label="Identifiant"
          mode="outlined"
          style={styles.input}
        />
        <ATextInput
          value={password}
          onChangeText={setPassword}
          editable={!isDisabled}
          secureTextEntry
          autoCapitalize="none"
          autoCompleteType="password"
          label="Mot de passe"
          mode="outlined"
          style={styles.input}
        />
        <View style={styles.btn}>
          <Button
            onPress={() => {
              setLoginLoading(
                userService
                  .login(username, password)
                  .then(() => {
                    navigation.navigate(Route.modules);
                  })
                  .catch(() => {
                    setLoginLoading(undefined);
                  }),
              );
            }}
            title="se connecter"
            disabled={
              isDisabled || username.trim() === "" || password.trim() === ""
            }
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: "#FFF",
    marginBottom: 10,
  },
  btn: {
    marginTop: 10,
  },
});
