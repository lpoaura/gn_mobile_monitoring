import React from "react";
import { ATextInput, ATextInputProps } from "../ATextInput";
import { AModal } from "../../modals/AModal";
import { TouchableOpacity } from "react-native";
import { ADataListPanel } from "./ADataListPanel";
import { ABadgeList } from "../../badges/ABadgeList";

type BaseProps<T> = {
  fetch: (search: string) => Promise<T[]>;
  inputProps?: ATextInputProps;
  getKeyAndLabel: (option: T) => { key: string; label: string };
};

type MultipleValueProps<T> = BaseProps<T> & {
  value?: T[];
  onChange: (value: T[]) => void;
  multiple: true;
};

type SingleValueProps<T> = BaseProps<T> & {
  value?: T;
  onChange: (value: T) => void;
  multiple?: false;
};

type Props<T> = MultipleValueProps<T> | SingleValueProps<T>;

export function ADataListInput<T>(props: Props<T>) {
  const [modalOpened, setModalOpened] = React.useState(false);

  return (
    <>
      {props.multiple ? (
        <ABadgeList
          badges={(props.value ?? []).map(props.getKeyAndLabel)}
          onAdd={() => setModalOpened(true)}
          onClick={key => {
            const newValues = [...(props.value ?? [])];
            newValues.splice(
              newValues.findIndex(v => props.getKeyAndLabel(v).key === key),
              1,
            );
            props.onChange(newValues);
          }}
        />
      ) : (
        <TouchableOpacity onPress={() => setModalOpened(true)}>
          <ATextInput
            {...props.inputProps}
            editable={false}
            value={props.value ? props.getKeyAndLabel(props.value).label : ""}
          />
        </TouchableOpacity>
      )}
      <AModal open={modalOpened} onClose={() => setModalOpened(false)}>
        <ADataListPanel
          fetch={props.fetch}
          onClose={() => setModalOpened(false)}
          onSelect={valueToAdd => {
            if (props.multiple) {
              props.onChange([...(props.value ?? []), valueToAdd]);
            } else {
              props.onChange(valueToAdd);
            }
            setModalOpened(false);
          }}
          getKeyAndLabel={props.getKeyAndLabel}
        />
      </AModal>
    </>
  );
}
