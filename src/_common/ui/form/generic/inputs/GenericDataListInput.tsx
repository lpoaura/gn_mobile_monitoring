import React, { useMemo } from "react";
import { GenericConfigDataList } from "../_models/GenericFormConfig.model";
import { useController, useFormContext } from "react-hook-form";
import Autocomplete from "react-native-autocomplete-input";
import { AText } from "../../../text/AText";
import { DataListUtils } from "../../../../datalist/DataList.utils";
import { TouchableRipple } from "react-native-paper";

type Props = {
  name: string;
  config: GenericConfigDataList;
};

export function GenericDataListInput(props: Props) {
  const { control } = useFormContext();
  const { field } = useController({
    control,
    name: props.name,
  });
  const [search, setSearch] = React.useState(field.value ?? "");
  const [items, setItems] = React.useState<any[]>([]);

  React.useEffect(() => {
    DataListUtils.fetchItems(props.config).then(fetchItems => setItems(fetchItems ?? []));
  }, [props.config]);

  const filteredItems = useMemo(() => {
    return items.filter(item => item[props.config.keyLabel]?.includes(search)); // TODO fuzzy search
  }, [items, search, props.config.keyLabel]);

  return (
    <>
      <AText>{search}</AText>
      <Autocomplete // TODO create a custom component instead of this bad one
        data={filteredItems}
        onChangeText={setSearch}
        keyExtractor={item => item[props.config.keyValue]}
        renderItem={({ item }) => <AText>{item[props.config.keyLabel]}</AText>}
        flatListProps={{
          keyExtractor: item => item[props.config.keyValue],
          renderItem: ({ item }) => (
            <TouchableRipple
              onPress={() => {
                const selectedValue = item[props.config.keyValue];
                if (props.config.multiple) {
                  const newValues = field.value?.length > 0 ? [...field.value] : [];
                  newValues.includes(selectedValue)
                    ? newValues.splice(newValues.indexOf(selectedValue), 1)
                    : newValues.push(selectedValue);
                  setSearch(
                    newValues
                      .map(
                        value =>
                          items.find(item_ => item_[props.config.keyValue] === value)?.[props.config.keyLabel] ?? "-",
                      )
                      .join(", "),
                  );
                  field.onChange(newValues);
                } else {
                  setSearch(item[props.config.keyLabel]);
                  field.onChange(selectedValue);
                }
              }}
            >
              <AText>{(item as any)[props.config.keyLabel]}</AText>
            </TouchableRipple>
          ),
        }}
      />
    </>
  );
}
