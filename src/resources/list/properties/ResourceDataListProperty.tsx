import React, { useMemo } from "react";
import { Primitive } from "../../_model/ResourceResponse.model";
import { GenericConfigDataList } from "../../../_common/ui/form/generic/_models/GenericFormConfig.model";
import { ResourceDefaultItemProperty } from "./ResourceDefaultItemProperty";
import _ from "lodash";
import { dataListService } from "../../../_common/ui/form/generic/inputs/dataList/DataList.service";
import { observer } from "mobx-react-lite";
import { ResourceDataListPropertyValue } from "./ResourceDataListPropertyValue";

type Props = {
  propertyConfig: GenericConfigDataList;
  value?: Primitive | Primitive[];
};

export const ResourceDataListProperty = observer((props: Props) => {
  const values = useMemo(
    () => (_.isArray(props.value) ? props.value : props.value !== undefined ? [props.value] : undefined),
    [props.value],
  );
  const [fetchedValues, setFetchedValues] = React.useState(
    values?.map(v => ({
      value: v,
      loadingState: dataListService.fetchItem(props.propertyConfig, v as number | string),
    })) ?? [],
  );

  React.useEffect(() => {
    setFetchedValues(
      values?.map(v => ({
        value: v,
        loadingState: dataListService.fetchItem(props.propertyConfig, v as number | string),
      })) ?? [],
    );
  }, [values]);

  return (
    <ResourceDefaultItemProperty propertyConfig={props.propertyConfig}>
      {fetchedValues.map(({ value, loadingState }, index) => (
        <ResourceDataListPropertyValue
          key={index}
          propertyConfig={props.propertyConfig}
          value={value}
          loadingState={loadingState}
          isLast={index === fetchedValues.length - 1}
        />
      ))}
    </ResourceDefaultItemProperty>
  );
});
