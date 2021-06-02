import React from "react";
import { GenericConfigDataList } from "../_models/GenericFormConfig.model";
import { useController, useFormContext } from "react-hook-form";
import { ADateInput } from "../../ADateInput";

type Props = {
  name: string;
  config: GenericConfigDataList;
};

export function GenericDateListInput(props: Props) {
  const { control } = useFormContext();
  const { field } = useController({
    control,
    defaultValue: new Date(),
    name: props.name,
  });
  return <ADateInput value={field.value} onChange={(event, value) => field.onChange(value)} />;
}
