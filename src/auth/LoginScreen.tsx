import React, { useState } from "react";
import { Button, View } from "react-native";
import { ATextInput } from "../_common/ui/form/ATextInput";
import { userService } from "./_services/User.service";

export function LoginScreen() {
  const [loginLoading, setLoginLoading] = useState<Promise<void>>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isDisabled = !!loginLoading;

  return (
    <View>
      <ATextInput
        value={username}
        onChangeText={setUsername}
        editable={!isDisabled}
        autoCapitalize="none"
        autoCompleteType="username"
      />
      <ATextInput
        value={password}
        onChangeText={setPassword}
        editable={!isDisabled}
        secureTextEntry
        autoCapitalize="none"
        autoCompleteType="password"
      />
      <Button
        onPress={() => {
          setLoginLoading(
            userService.login(username, password).catch(err => {
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
  );
}
