//React
import React, { useEffect, useState } from 'react';

//React-native
import { ActivityIndicator, Image, Text, View} from 'react-native';
import { Button } from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';


//Others components
import { SearchBar } from '../../Components/SearchBar';
import { UsersList } from '../../Components/UsersList';

//Hooks
import { useUsers } from '../../Hooks/useUsers';

//Styles
import { styles } from './styles';

export default function Users() {
  const { data, isLoading,  isFetching, refetch } = useUsers();
  const [wantedUser, setWantedUser] = useState('');
  return (
    <SafeAreaView style={{flex: 1,backgroundColor: 'black'}}>
      <View style={styles.logoTitleSearchContainer}>
          <Image source={require('../../../Assets/Images/logo.png')} style={styles.logo}/>
          <Text style={styles.title}> Cadastro de Clientes </Text>
          <Button onPress={() => refetch()}><Text style={{color: 'white'}}>Refresh</Text></Button>
          <SearchBar name={wantedUser} setName={setWantedUser} />
      </View>
      <View style={{flex:1 }}>
        {isLoading || isFetching
          ? <ActivityIndicator size="large" />
          : <UsersList users={data?.users} wantedUser={wantedUser}/>
        }
      </View>
    </SafeAreaView>
  );
}
