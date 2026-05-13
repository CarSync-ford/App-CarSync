export interface ILoginCredentials {
  usuario: string;
  senha: string;
}

export interface ILoginResponse {
  token: string;
  user: {
    id: string;
    nome: string;
  };
}
