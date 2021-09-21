import { Geometry } from "geojson";

export type Primitive = string | number | boolean;

export type Resource = {
  properties: Record<string, Primitive | Primitive[]>;
  object_type: string;
  module_code: string;
  site_id?: number;
  id: number;
  geometry?: Geometry;
};

export type ResourceResponse = {
  properties: Record<string, Primitive | Primitive[]>;
  object_type: "module" | "site" | "visit" | "observation";
  module_code: string;
  id: number;
  children: Record<string, Resource[]>;
  geometry?: Geometry;
};
