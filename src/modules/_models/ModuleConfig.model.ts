import { ResourceConfig } from "../../_common/ui/form/generic/_models/ResourceConfig.model";

export type ModuleConfigResponse = {
  last_modif: number;
  observation: ResourceConfig;
  site: ResourceConfig;
  visit: ResourceConfig;
  taxonomy_display_field_name: string;
  tree: object;
};
