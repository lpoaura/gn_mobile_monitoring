import React from "react";
import { GenericConfigNomenclature } from "../../_models/GenericFormConfig.model";
import { NomenclatureResult, NomenclatureUtils } from "./Nomenclature.utils";
import { ASelectInput } from "../../../inputs/ASelectInput";
import { useController, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  config: GenericConfigNomenclature;
};

export function GenericNomenclatureInput(props: Props) {
  const { control } = useFormContext();
  const { field } = useController({
    control,
    defaultValue: "",
    name: props.name,
  });

  const [nomenclature, setNomenclature] = React.useState<NomenclatureResult>();

  React.useEffect(() => {
    let active = true;
    NomenclatureUtils.fetch(props.config).then(result => {
      if (!active) {
        return;
      }
      setNomenclature(result);
    });

    return () => {
      active = false;
    };
  }, [props.config]);

  if (!nomenclature) {
    return null;
  }

  return (
    <ASelectInput
      value={field.value}
      onChange={field.onChange}
      options={nomenclature.values.map(nomenclatureValue => ({
        label: nomenclatureValue.label_default,
        value: nomenclatureValue.id_nomenclature,
      }))}
    />
  );
}
