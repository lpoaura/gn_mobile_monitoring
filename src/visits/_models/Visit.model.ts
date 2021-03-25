export type VisitObservation = {
  properties: {
    id_observation: number;
    id_base_visit: number;
    cd_nom: number;
    comments: string;
    uuid_observation: string;
    nb_0_5: number;
    nb_5_10: number;
    nb_sup_100m: number;
    id_parent: number;
  };
  object_type: string;
  module_code: string;
  site_id: number;
  id: number;
};

export type VisitResponse = {
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
    time_start: string;
    cloud_percentage: string;
    rain: string;
    wind: string;
    visibility: string;
    snow_removal: number;
    id_parent: number;
  };
  object_type: string;
  module_code: string;
  site_id: number;
  id: number;
  children: {
    observation: VisitObservation[];
  };
};
