import React from "react";
import { GenericConfigBoolCheckbox } from "../_models/GenericFormConfig.model";
import { useController, useFormContext } from "react-hook-form";
import { ACheckboxInput } from "../../inputs/ACheckboxInput";

type Props = {
  name: string;
  config: GenericConfigBoolCheckbox;
};

export function GenericCheckboxInput(props: Props) {
  const { control } = useFormContext();
  const { field } = useController({
    control,
    defaultValue: false,
    name: props.name,
  });
  return (
    <ACheckboxInput
      status={field.value ? "checked" : "unchecked"}
      onPress={() => field.onChange(!field.value ? "checked" : "unchecked")}
    />
  );
}
