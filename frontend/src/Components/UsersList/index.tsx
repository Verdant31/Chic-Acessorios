//React
import React from 'react';

//React-native
import { FlatList } from 'react-native';
import { UsersListProps } from '../../Types/user';
import { UserCard } from '../UserCard';

//Styles



export function UsersList({users, wantedUser}: UsersListProps) {
    
  const serializedUsers = users?.filter((val) => {
    if(val.username.toLocaleLowerCase().includes(wantedUser.toLocaleLowerCase())){
      return val;
    }
  })

    return (
        <FlatList
            style={{ marginTop: -110}}
            data={serializedUsers}
            keyExtractor={user => String(user.id)}
            renderItem={ ({item}) => <UserCard user={item} />}
        >
        </FlatList>
 
    )
}
