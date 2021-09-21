import React, { PropsWithChildren } from "react";
import { View } from "react-native";
import { AText } from "../../../_common/ui/text/AText";
import { ColorsTheme } from "../../../_common/ui/Colors.theme";
import { GenericFormConfig } from "../../../_common/ui/form/generic/_models/GenericFormConfig.model";
import { Primitive } from "../../_model/ResourceResponse.model";
import _ from "lodash";

type Props = {
  propertyConfig?: GenericFormConfig;
  value?: Primitive | Primitive[];
};

export function ResourceDefaultItemProperty(props: PropsWithChildren<Props>) {
  return (
    <View>
      <AText theme="small" color={ColorsTheme.textOnPrimary}>
        {props.propertyConfig?.attribut_label}
      </AText>
      <AText theme="normal" color={ColorsTheme.textOnPrimary}>
        {props.children
          ? props.children
          : props.value === "" || props.value == null
          ? "-"
          : _.isArray(props.value)
          ? props.value.join(", ")
          : props.value}
      </AText>
    </View>
  );
}
