import React from "react";
import { GenericConfigDate } from "../_models/GenericFormConfig.model";
import { useController, useFormContext } from "react-hook-form";
import { ADateInput } from "../../ADateInput";

type Props = {
  name: string;
  config: GenericConfigDate;
};

export function GenericDateInput(props: Props) {
  const { control } = useFormContext();
  const { field } = useController({
    control,
    defaultValue: new Date(),
    name: props.name,
  });
  return <ADateInput value={field.value} onChange={(event, value) => field.onChange(value)} />;
}
