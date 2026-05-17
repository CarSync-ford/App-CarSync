export type IRegisterCredentials = {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  confirmarSenha: string;
};

export type IRegisterPayload = {
  username: string;
  email: string;
  password: string;
  cpf: string;
};

export type IRegisterResponse = {
  id: string;
};

export type PasswordRulesProps = {
  password: string;
};
