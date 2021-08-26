import React from "react";
import { Picker } from "react-native";

type Props<T> = {
  value?: T;
  options: { label: string; value: T }[];
  onChange?: (value: T) => void;
};

export function ASelectInput<T extends string | number>(props: Props<T>) {
  return (
    <Picker selectedValue={props.value} style={{ height: 50, width: 150 }} onValueChange={props.onChange}>
      {props.options.map(({ value, label }) => {
        return <Picker.Item key={value} label={label} value={value} />;
      })}
    </Picker>
  );
}
