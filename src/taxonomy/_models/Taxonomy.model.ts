export type TaxonomySearchTaxon = {
  cd_nom: number;
  nom_vern?: string | null;
  search_name: string;
  group2_inpn: string;
  nom_valide: string;
  cd_ref: number;
  lb_nom: string;
  regne: string;
};

export type TaxonomySearchResponse = TaxonomySearchTaxon[];
