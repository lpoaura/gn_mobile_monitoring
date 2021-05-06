export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

type BaseGenericConfig = {
  type_widget?: string;
  attribut_label: string;
  hidden?: boolean;
  required?: boolean;
  type_util?: string;
};

export type GenericConfigText = BaseGenericConfig & {
  type_widget: "text";
};

export type GenericConfigDate = BaseGenericConfig & {
  type_widget: "date";
};

export type GenericConfigTime = BaseGenericConfig & {
  type_widget: "time";
};

export type GenericConfigMedias = BaseGenericConfig & {
  type_widget: "medias";
  schema_dot_table: string;
};

export type GenericConfigRadio = BaseGenericConfig & {
  type_widget: "radio";
  values: string[];
};

export type GenericConfigNumber = BaseGenericConfig & {
  type_widget: "number";
  min?: number;
  max?: number;
};

export type GenericConfigBoolCheckbox = BaseGenericConfig & {
  type_widget: "bool_checkbox";
};

export type GenericConfigTaxonomy = BaseGenericConfig & {
  type_widget: "taxonomy";
  id_list: number;
};

export type GenericConfigSelect = BaseGenericConfig & {
  type_widget: "select";
  values: string[];
};

export type GenericConfigDataList = BaseGenericConfig & {
  type_widget: "datalist";
  api: string;
  application: string;
  keyValue: string;
  keyLabel: string;
  data_path?: string;
  multiple?: boolean;
  params?: object;
};

export type GenericConfigNomenclature = Omit<
  GenericConfigDataList,
  "type_widget"
> & {
  type_widget: "nomenclature";
  code_nomenclature_type: string;
  value: {
    cd_nomenclature: string;
    cd_nomenclature_type: string;
  };
};

export type GenericFormConfig =
  | GenericConfigText
  | GenericConfigDate
  | GenericConfigTime
  | GenericConfigMedias
  | GenericConfigNumber
  | GenericConfigBoolCheckbox
  | GenericConfigRadio
  | GenericConfigSelect
  | GenericConfigTaxonomy
  | GenericConfigNomenclature
  | GenericConfigDataList;
