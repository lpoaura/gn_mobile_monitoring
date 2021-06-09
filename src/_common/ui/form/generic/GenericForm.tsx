import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { GenericInput } from "./GenericInput";
import { ResourceConfig } from "../../../../resources/_model/ResourceConfig.model";
import { AButton } from "../../btn/AButton";

type Props<T> = {
  config: ResourceConfig;
  onSubmit?: (data: T) => void;
};

export function GenericForm<T>(props: Props<T>) {
  const methods = useForm<T>({ mode: "onBlur" });
  return (
    <FormProvider {...methods}>
      {Object.entries(props.config.generic).map(([key, config]) => (
        <GenericInput key={key} name={key} config={config} />
      ))}
      {Object.entries(props.config.specific).map(([key, config]) => (
        <GenericInput key={key} name={key} config={config} />
      ))}
      {props.onSubmit && (
        <AButton onPress={methods.handleSubmit(data => props.onSubmit?.(data as T))} theme="primary">
          sauver
        </AButton>
      )}
    </FormProvider>
  );
}
