import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { GenericInput } from "./GenericInput";
import { ResourceConfig } from "../../../../resources/_model/ResourceConfig.model";
import { AButton } from "../../btn/AButton";
import { ScrollView, StyleSheet, View } from "react-native";

type Props<T> = {
  config: ResourceConfig;
  onSubmit?: (data: T) => void;
};

export function GenericForm<T>(props: Props<T>) {
  const methods = useForm<T>({ mode: "onBlur" });
  return (
    <FormProvider {...methods}>
      <View style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="always">
          {Object.entries(props.config.generic).map(([key, config]) => (
            <GenericInput key={key} name={key} config={config} />
          ))}
          {Object.entries(props.config.specific).map(([key, config]) => (
            <GenericInput key={key} name={key} config={config} />
          ))}
        </ScrollView>
      </View>
      {props.onSubmit && (
        <View style={styles.footer}>
          <AButton onPress={methods.handleSubmit(data => props.onSubmit?.(data as T))} theme="primary">
            sauver
          </AButton>
        </View>
      )}
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});
