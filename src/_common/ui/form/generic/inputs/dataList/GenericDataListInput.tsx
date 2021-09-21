import React from "react";
import { GenericConfigDataList } from "../../_models/GenericFormConfig.model";
import { useController, useFormContext } from "react-hook-form";
import { dataListService } from "./DataList.service";
import { ADataListInput } from "../../../inputs/dataList/ADataListInput";

type Props = {
  name: string;
  config: GenericConfigDataList;
};

export function GenericDataListInput(props: Props) {
  const itemsIndexRef = React.useRef<Partial<Record<string, any>>>({});
  const { control } = useFormContext();
  const { field } = useController({
    control,
    name: props.name,
  });
  return (
    <ADataListInput<any, any>
      fetch={search =>
        dataListService.fetchItems(props.config).promise!.then(
          fetchedItems => {
            fetchedItems.map(item => {
              itemsIndexRef.current[item[props.config.keyValue]] = item;
            });
            return fetchedItems.filter(
              item => item[props.config.keyLabel].toLowerCase().indexOf(search.toLowerCase()) >= 0,
            );
          }, // TODO fuzzy search
        )
      }
      getKeyAndLabel={value => ({ key: value[props.config.keyValue], label: value[props.config.keyLabel] })}
      value={field.value}
      onChange={field.onChange}
      multiple={props.config.multiple}
      getLabel={itemKey => itemsIndexRef.current[itemKey][props.config.keyLabel] ?? "-"}
    />
  );
}
