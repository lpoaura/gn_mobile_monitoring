import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { ATextInput } from "../_common/ui/form/inputs/ATextInput";
import { userService } from "./_services/User.service";
import { useNavigation } from "@react-navigation/native";
import { Screen } from "../_common/ui/Screen";
import { Route } from "../_configs/RoutesConfig";
import { GNMMLogo } from "../_common/ui/logo/GNMMLogo";
import { ColorsTheme } from "../_common/ui/Colors.theme";
import { AText } from "../_common/ui/text/AText";
import { AButton } from "../_common/ui/btn/AButton";
import { TopographyImage } from "../_common/ui/images/TopographyImage";

export function LoginScreen() {
  const navigation = useNavigation();
  const [loginLoading, setLoginLoading] = useState<Promise<void>>();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const isDisabled = !!loginLoading;

  const translateAnim = useRef(new Animated.Value(400)).current;
  useEffect(() => {
    Animated.timing(translateAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [translateAnim]);

  return (
    <Screen noScroll color={ColorsTheme.secondary}>
      <View style={styles.container}>
        <View style={styles.background}>
          <TopographyImage />
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.logo}>
            <GNMMLogo />
          </View>
          <Animated.View style={[styles.loginBox, { transform: [{ translateY: translateAnim }] }]}>
            <View style={styles.loginBoxTitle}>
              <AText theme="title" color={ColorsTheme.textOnBackground}>
                connexion
              </AText>
            </View>
            <ATextInput
              value={username}
              onChangeText={setUsername}
              editable={!isDisabled}
              autoCapitalize="none"
              autoCompleteType="username"
              placeholder="identifiant"
              style={styles.input}
            />
            <ATextInput
              value={password}
              onChangeText={setPassword}
              editable={!isDisabled}
              secureTextEntry
              autoCapitalize="none"
              autoCompleteType="password"
              placeholder="mot de passe"
              style={styles.input}
            />
            <View style={styles.btn}>
              <AButton
                onPress={() => {
                  setLoginLoading(
                    userService
                      .login(username, password)
                      .then(() => {
                        (navigation as any).replace(Route.modules);
                      })
                      .catch(() => {
                        setLoginLoading(undefined);
                      }),
                  );
                }}
                disabled={isDisabled || username.trim() === "" || password.trim() === ""}
                theme="primary"
              >
                se connecter
              </AButton>
            </View>
          </Animated.View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    backgroundColor: ColorsTheme.secondary,
  },
  innerContainer: {
    flex: 1,
  },
  logo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginBox: {
    backgroundColor: ColorsTheme.background,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 30,
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  loginBoxTitle: {
    marginBottom: 30,
    alignItems: "center",
  },
  input: {
    marginBottom: 10,
  },
  btn: {
    marginTop: 10,
  },
});
