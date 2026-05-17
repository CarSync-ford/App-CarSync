export interface ILoginCredentials {
  email: string;
  senha: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}
