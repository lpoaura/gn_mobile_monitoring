import React from "react";
import {
  GenericConfigDate,
  GenericConfigDateUtil,
} from "../../../_common/ui/form/generic/_models/GenericFormConfig.model";
import dayjs from "dayjs";
import { ResourceDefaultItemProperty } from "./ResourceDefaultItemProperty";
import { Primitive } from "../../_model/ResourceResponse.model";
import _ from "lodash";

type Props = {
  propertyConfig: GenericConfigDate | GenericConfigDateUtil;
  value?: Primitive | Primitive[];
};

export function ResourceDateProperty(props: Props) {
  return (
    <ResourceDefaultItemProperty
      propertyConfig={props.propertyConfig}
      value={props.value && _.isString(props.value) ? dayjs(props.value).format("DD/MM/YYYY") : props.value}
    />
  );
}
