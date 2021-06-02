import React, { useMemo } from "react";
import { GenericConfigTime } from "../_models/GenericFormConfig.model";
import { useController, useFormContext } from "react-hook-form";
import { ADateInput } from "../../ADateInput";

type Props = {
  name: string;
  config: GenericConfigTime;
};

export function GenericTimeInput(props: Props) {
  const { control } = useFormContext();
  const { field } = useController({
    control,
    defaultValue: "",
    name: props.name,
  });
  const timeDate = useMemo(() => {
    const date = new Date();
    const [hours, minutes] = field.value.split(":");
    if (minutes !== undefined) {
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
    }
    return date;
  }, [field.value]);
  return (
    <ADateInput
      mode="time"
      is24Hour
      value={timeDate}
      onChange={(event, value) => {
        if (value) {
          field.onChange(value.getHours() + ":" + value.getMinutes());
        }
      }}
    />
  );
}
