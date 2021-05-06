import { ResourceConfig } from "../../resources/_model/ResourceConfig.model";

export type ModuleConfigResponse = {
  last_modif: number;
  taxonomy_display_field_name: string;
  tree: object;
} & { [resourceType: string]: ResourceConfig | undefined };
