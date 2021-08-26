import React, { useMemo } from "react";
import { GenericConfigSelect } from "../_models/GenericFormConfig.model";
import { useController, useFormContext } from "react-hook-form";
import { ASelectInput } from "../../inputs/ASelectInput";

type Props = {
  name: string;
  config: GenericConfigSelect;
};

export function GenericSelectInput(props: Props) {
  const { control } = useFormContext();
  const { field } = useController({
    control,
    name: props.name,
  });
  const options = useMemo(
    () => [{ value: null, label: "-" }, ...props.config.values.map(value => ({ value, label: value }))],
    [props.config.values],
  );
  return <ASelectInput value={field.value} onChange={field.onChange} options={options} />;
}
