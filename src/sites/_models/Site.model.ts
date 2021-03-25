export type SiteVisit = {
  properties: {
    id_base_visit: number;
    id_base_site: number;
    id_module: number;
    observers: number[];
    id_digitiser: number;
    visit_date_min: string;
    uuid_base_visit: string;
    id_dataset: number;
    nb_observations: number;
    beginner?: "Oui" | "Non" | null;
    time_start: string;
    cloud_percentage: string;
    rain: string;
    wind: string;
    visibility: string;
    snow_removal: number;
    id_parent: number;
  };
  object_type: "visit";
  module_code: string;
  site_id: number;
  id: number;
};

export type SiteResponse = {
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
  site_id: number;
  id: number;
  children: {
    visit: SiteVisit[];
  };
  geometry: { type: "Point"; coordinates: [-1.584048, 48.829272] };
};
