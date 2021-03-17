export type Module = {
  id_module: number;
  module_code: string;
  module_label: string;
  module_picto?: string;
  module_desc?: string;
  module_group?: string;
  module_path: string;
  module_external_url?: string;
  module_target?: string;
  module_comment?: string;
  active_frontend: boolean;
  active_backend: boolean;
  module_doc_url?: string;
  module_order?: number;
  uuid_module_complement?: string;
  id_list_observer: number;
  id_list_taxonomy: number;
  taxonomy_display_field_name: string;
  b_synthese: boolean;
  meta_create_date: string;
  meta_update_date: string;
  cruved: {
    C: number;
    R: number;
    U: number;
    V: number;
    E: number;
    D: number;
  };
};

export type ModulesResponse = Module[];
