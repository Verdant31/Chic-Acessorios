import { api } from '../Services/api';
import { useQuery } from 'react-query';
import { GetUsersResponse, MongoDbUser } from '../Types/user';
import XDate from 'xdate';

export async function getUsers() : Promise<GetUsersResponse>{
    const { data } = await api.get('/users/getusers')    
    const users = data.map((user: MongoDbUser) => {
        return {
            id: user._id,
            username: user.username,
            email: user.email,
            cpf: user.cpf,
            phone: user.phone,
            cupom: {
                name: (user.cupom.name && user.cupom.name) ,
                generationDate: (user.cupom.generationDate && new XDate(user.cupom.generationDate).toString("d/MM/yy")),
                expirationDate: (user.cupom.generationDate && new XDate(user.cupom.expirationDate).toString("d/MM/yy")),
            }
        }
    })
    return {users};   
};

export function useUsers() {
    return useQuery(['users'], () => getUsers(), {
        staleTime: 1000 * 5, //5 seconds
      });
}
