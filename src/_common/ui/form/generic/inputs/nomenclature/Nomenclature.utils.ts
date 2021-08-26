import { GenericConfigNomenclature } from "../../_models/GenericFormConfig.model";
import { fetchUtils } from "../../../../../_utils/Fetch.utils";
import { instancesService } from "../../../../../../instances/_services/Instances.service";

const cache: Record<string, Promise<NomenclatureResult>> = {};

export type Nomenclature = {
  id_type: number;
  definition_default: string;
  label_default: string;
  mnemonique: string;
  source: string;
  statut: string;
};

export type NomenclatureValue = Nomenclature & {
  active: boolean;
  cd_nomenclature: string;
  id_nomenclature: number;
};

export type NomenclatureResult = Nomenclature & {
  values: NomenclatureValue[];
};

export const NomenclatureUtils = {
  fetch(config: GenericConfigNomenclature): Promise<NomenclatureResult> {
    let url = `${instancesService.instance.apiUrl}/nomenclatures/nomenclature/${config.code_nomenclature_type}?orderby=label_default`;
    if (!cache[url]) {
      cache[url] = fetchUtils.get<NomenclatureResult>(url).then(({ data }) => data);
    }
    return cache[url];
  },
};
