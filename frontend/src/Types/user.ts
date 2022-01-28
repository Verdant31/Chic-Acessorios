export type User ={
    id: string,
    username: string,
    email: string,
    cpf: string,
    phone: string,
    cupom: {
        name: string;
        generationDate: Date;
        expirationDate: Date;
    }
}
  
export interface UsersListProps {
      users: User[] | undefined,
      wantedUser: string,
};


export type MongoDbUser ={
    _id: string,
    username: string,
    email: string,
    cpf: string,
    phone: string,
    cupom: {
        name: string;
        generationDate: Date;
        expirationDate: Date;
    }
}

export type GetUsersResponse = {
    users: User[];
}
