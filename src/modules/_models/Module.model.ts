import { Geometry } from "geojson";

export type Site = {
  properties: {
    id_base_site: number;
    id_module: number;
    base_site_name: string;
    id_nomenclature_type_site: number;
    id_digitiser: number;
    last_visit: string;
    nb_visits: number;
    uuid_base_site: string;
  };
  object_type: "site";
  module_code: string;
  site_id: 26;
  id: 26;
  geometry: Geometry;
};

export type ModuleResponse = {
  id: number;
  children: {
    site: Site[];
  };
  module_code: string;
  object_type: "module";
};
