import React from "react";
import { observer } from "mobx-react-lite";
import { Primitive } from "../../_model/ResourceResponse.model";
import { LoadingState, LoadingStatus } from "../../../_common/loadings/_models/LoadingState.model";
import { GenericConfigDataList } from "../../../_common/ui/form/generic/_models/GenericFormConfig.model";
import { Text } from "react-native";

type Props = {
  value: Primitive;
  loadingState: LoadingState<any>;
  propertyConfig: GenericConfigDataList;
  isLast?: boolean;
};

export const ResourceDataListPropertyValue = observer((props: Props) => {
  const value =
    props.loadingState.status.get() === LoadingStatus.SUCCEEDED
      ? props.loadingState.value?.[props.propertyConfig.keyLabel]
      : props.value;
  return (
    <Text>
      {value ?? props.value}
      {props.isLast ? "" : ", "}
    </Text>
  );
});
