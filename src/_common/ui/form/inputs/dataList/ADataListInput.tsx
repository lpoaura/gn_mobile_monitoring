import React from "react";
import { ATextInput, ATextInputProps } from "../ATextInput";
import { AModal } from "../../../modals/AModal";
import { TouchableOpacity } from "react-native";
import { ADataListPanel } from "./ADataListPanel";
import { ABadgeList } from "../../../badges/ABadgeList";

type BaseProps<T, TApi> = {
  fetch: (search: string) => Promise<TApi[]>;
  inputProps?: ATextInputProps;
  getKeyAndLabel: (option: TApi) => { key: T; label: string };
  getLabel: (value: T) => string;
};

type MultipleValueProps<T, TApi> = BaseProps<T, TApi> & {
  value?: T[];
  onChange: (value: T[]) => void;
  multiple: true;
};

type SingleValueProps<T, TApi> = BaseProps<T, TApi> & {
  value?: T;
  onChange: (value: T) => void;
  multiple?: false;
};

type Props<T, TApi> = MultipleValueProps<T, TApi> | SingleValueProps<T, TApi>;

export function ADataListInput<T, TApi>(props: Props<T, TApi>) {
  const [modalOpened, setModalOpened] = React.useState(false);

  return (
    <>
      {props.multiple ? (
        <ABadgeList
          badges={(props.value ?? []).map(value => ({ key: value + "", label: props.getLabel(value) }))}
          onAdd={() => setModalOpened(true)}
          onClick={key => {
            const newValues = [...(props.value ?? [])];
            newValues.splice(
              newValues.findIndex(v => v + "" === key),
              1,
            );
            props.onChange(newValues);
          }}
        />
      ) : (
        <TouchableOpacity onPress={() => setModalOpened(true)}>
          <ATextInput {...props.inputProps} editable={false} value={props.value ? props.getLabel(props.value) : ""} />
        </TouchableOpacity>
      )}
      <AModal open={modalOpened} onClose={() => setModalOpened(false)}>
        <ADataListPanel
          fetch={props.fetch}
          onClose={() => setModalOpened(false)}
          onSelect={selectedValue => {
            const valueToAdd = props.getKeyAndLabel(selectedValue).key;
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
