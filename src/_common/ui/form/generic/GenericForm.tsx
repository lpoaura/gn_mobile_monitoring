import React from "react";
import { ResourceConfig } from "./_models/ResourceConfig.model";
import { FormProvider, useForm } from "react-hook-form";
import { GenericInput } from "./GenericInput";

type Props = {
  config: ResourceConfig;
};

export function GenericForm(props: Props) {
  const methods = useForm({ mode: "onBlur" });
  return (
    <FormProvider {...methods}>
      {Object.entries(props.config.generic).map(([key, config]) => (
        <GenericInput key={key} name={key} config={config} />
      ))}
      {Object.entries(props.config.specific).map(([key, config]) => (
        <GenericInput key={key} name={key} config={config} />
      ))}
    </FormProvider>
  );
}
