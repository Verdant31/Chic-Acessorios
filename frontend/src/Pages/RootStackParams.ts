type User = {
  id: string,
  name: string,
  email: string,
  phone: string;
  cpf: string;
  cupom?: {
    name: string;
    generationDate: Date;
    expirationDate: Date;
  }
}

export type RootStackParamList = {
  Usuários: undefined;
  User: { user: User};
  Login: undefined;
  AddUser: undefined;
  Cupom: { user: User};
};
