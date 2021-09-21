import React from "react";
import { Primitive } from "../../_model/ResourceResponse.model";
import { GenericConfigNomenclature } from "../../../_common/ui/form/generic/_models/GenericFormConfig.model";
import { ResourceDefaultItemProperty } from "./ResourceDefaultItemProperty";
import {
  NomenclatureResult,
  NomenclatureUtils,
} from "../../../_common/ui/form/generic/inputs/nomenclature/Nomenclature.utils";
import _ from "lodash";

type Props = {
  propertyConfig: GenericConfigNomenclature;
  value?: Primitive | Primitive[];
};

export const ResourceNomenclatureProperty = (props: Props) => {
  const [nomenclature, setNomenclature] = React.useState<NomenclatureResult>();

  React.useEffect(() => {
    let active = true;
    NomenclatureUtils.fetch(props.propertyConfig).then(result => {
      if (!active) {
        return;
      }
      setNomenclature(result);
    });
    return () => {
      active = false;
    };
  }, [props.propertyConfig]);

  return (
    <ResourceDefaultItemProperty propertyConfig={props.propertyConfig}>
      {_.isArray(props.value)
        ? props.value.map(value => nomenclature?.values.find(n => n.id_nomenclature === value))
        : nomenclature?.values.find(n => n.id_nomenclature === props.value)?.label_default ?? props.value}
    </ResourceDefaultItemProperty>
  );
};
