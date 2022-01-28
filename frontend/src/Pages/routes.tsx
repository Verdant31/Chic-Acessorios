//React
import React from 'react';

//React-navigation
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

//React-native-paper
import { Button } from 'react-native-paper';

//Pages
import AddUser from './AddUser';
import User from './User';
import Users from './Users';

//Components and others
import { RootStackParamList } from './RootStackParams';

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Cupom from './Cupom';


const Stack = createNativeStackNavigator();

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'AddUser'>;


export default function Routes() {
    const navigation = useNavigation<LoginScreenProp>();

    return (
        <Stack.Navigator 
            screenOptions={{
                headerTitle: 'Chic Acessórios',
                headerTitleStyle: {
                    fontFamily:'Poppins-Regular',
                },
                headerStyle: {
                    backgroundColor: 'black',
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',

            }}
            initialRouteName='Usuários'
        >
            <Stack.Screen 
                name="Usuários"  
                component={Users} 
                options={{
                    headerRight: () => (
                        <Button
                            onPress={() => navigation.navigate('AddUser')}
                            icon={() => <Ionicons name="person-add" color="white" size={25}/>}
                            color="#fff"
                        >
                        </Button>
                        
                    ),
                }}
            />
            <Stack.Screen name="AddUser" component={AddUser} />
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="Cupom" component={Cupom} />
        </Stack.Navigator>
    )
}
