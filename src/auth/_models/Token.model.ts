export type LoginResponse = {
  user: {
    id_role: number;
    nom_role: string;
    prenom_role: string;
    id_application: number;
    id_organisme: number;
    identifiant: string;
    id_droit_max: number;
    apps: {};
  };
  expires: string;
};
