export interface IPersonal {
  id: number;
  matricule: string;
  nom: string;
  prenom: string;
  date_embauche: Date;
  poste: string;
  email: string;
  code_access: string;
  actif: boolean;
  is_admin: number;
  createdAt: Date;
  updatedAt: Date;
}
