import React from "react";
import { GenericConfigNumber } from "../_models/ResourceConfig.model";
import { useController, useFormContext } from "react-hook-form";
import { ANumberInput } from "../../ANumberInput";

type Props = {
  name: string;
  config: GenericConfigNumber;
};

export function GenericNumberInput(props: Props) {
  const { control } = useFormContext();
  const { field } = useController({
    control,
    defaultValue: "",
    name: props.name,
  });
  return <ANumberInput value={field.value} onChangeText={field.onChange} />;
}
