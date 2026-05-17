export type ILoginCredentials = {
  email: string;
  senha: string;
};

export type ILoginPayload = {
  email: string;
  password: string;
};

export type ILoginResponse = {
  token: string;
};
