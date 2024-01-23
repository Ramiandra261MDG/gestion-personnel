export interface IAuthToken {
  status: boolean;
  message: string;
  data: {
    id: number;
    matricule: string;
    nom: string;
    prenom: string;
    is_admin: number;
  };
  isLoggedIn: boolean;
  token: string;
}
