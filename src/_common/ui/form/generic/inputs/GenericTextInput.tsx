import React from "react";
import { GenericConfigText } from "../_models/GenericFormConfig.model";
import { ATextInput } from "../../inputs/ATextInput";
import { useController, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  config: GenericConfigText;
};

export function GenericTextInput(props: Props) {
  const { control } = useFormContext();
  const { field } = useController({
    control,
    defaultValue: "",
    name: props.name,
  });
  return <ATextInput value={field.value} onChangeText={field.onChange} />;
}
