export interface IRegisterCredentials {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  confirmarSenha: string;
}

export interface IRegisterPayload {
  username: string;
  email: string;
  password: string;
  cpf: string;
}

export interface IRegisterResponse {
  id: string;
}
