import React from "react";
import { ResourceConfig } from "../_model/ResourceConfig.model";
import { Resource } from "../_model/ResourceResponse.model";
import { ResourceDataListProperty } from "./properties/ResourceDataListProperty";
import { ResourceDefaultItemProperty } from "./properties/ResourceDefaultItemProperty";
import { ResourceDateProperty } from "./properties/ResourceDateProperty";
import { GenericConfigDateUtil } from "../../_common/ui/form/generic/_models/GenericFormConfig.model";
import { ResourceNomenclatureProperty } from "./properties/ResourceNomenclatureProperty";

type Props = {
  resourceConfig: ResourceConfig;
  propertyKey: string;
  resource: Resource;
};

export function ResourceItemProperty(props: Props) {
  const propertyConfig =
    props.resourceConfig.generic[props.propertyKey] ?? props.resourceConfig.specific[props.propertyKey];
  const value = props.resource.properties[props.propertyKey];
  switch (propertyConfig.type_widget) {
    case "datalist":
      return <ResourceDataListProperty propertyConfig={propertyConfig} value={value} />;
    case "date":
      return <ResourceDateProperty propertyConfig={propertyConfig} value={value} />;
    case "nomenclature":
      return <ResourceNomenclatureProperty propertyConfig={propertyConfig} value={value} />;
  }

  if (propertyConfig.type_widget === undefined) {
    switch (propertyConfig.type_util) {
      case "date":
        return <ResourceDateProperty propertyConfig={propertyConfig as GenericConfigDateUtil} value={value} />;
    }
  }

  return <ResourceDefaultItemProperty propertyConfig={propertyConfig} value={value} />;
}
