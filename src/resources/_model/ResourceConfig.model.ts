import { GenericFormConfig, SortOrder } from "../../_common/ui/form/generic/_models/GenericFormConfig.model";

type PropertyKey = string;

export type ResourceConfig<T extends PropertyKey = PropertyKey> = {
  id_field_name: T;
  description_field_name: string;
  label: string;
  uuid_field_name: string;
  display_properties: T[];
  sorts: { prop: T; dir: SortOrder }[];
  generic: Record<T, GenericFormConfig>;
  display_list: T[];
  specific: Record<T, GenericFormConfig>;
  children_types: T[] | null;
  parent_type: T | null;
  properties_keys: T[];
  id_table_location: number;
};
