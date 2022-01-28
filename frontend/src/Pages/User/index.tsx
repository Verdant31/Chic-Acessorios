//React
import React, { useState } from 'react';

//React-navigation
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

//React-native-paper
import { Button } from 'react-native-paper';
  
//React-native
import { Alert, Text, View } from 'react-native';

//Components and others
import {RootStackParamList} from '../../pages/RootStackParams';
import { ProfileUserInput } from '../../Components/ProfileUserInput';

//Styles
import { styles } from './styles';

//Icons
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { api } from '../../Services/api';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'User'>;

type UsersScreenProp = NativeStackNavigationProp<RootStackParamList, 'Cupom'>;

export default function User() {
    const route = useRoute<ProfileScreenRouteProp>();
    const navigation = useNavigation<UsersScreenProp>()
    const user = route.params;
    
    const [ name, setName ] = useState(user.user.name);
    const [ email, setEmail ] = useState(user.user.email);
    const [ cpf, setCpf ] = useState(user.user.cpf);
    const [ phone, setNumber ] = useState(user.user.phone);

    function updateName(name: string) {
        setName(name);
    }

    function updateEmail(email: string) {
        setEmail(email);
    }
    
    function updateCpf(cpf: string) {
        setCpf(cpf);
    }

    function updateNumber(phone: string) {
        setNumber(phone);
    }

    function handleEditUser() {
        api.put(`/users/updateuser`, {
            id: user.user.id,
            username: name,
            cpf: cpf,
            phone: phone,
            email: email
        })
            .then((response) => {
                Alert.alert(response.data.message)
            }).catch(err => {
                Alert.alert(err)
            })
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.avatar}>
                    <MaterialCommunityIcon name="face-woman" color="white" size={100}/>
                </View>
                <View style={styles.profileContainer}>
                    <ProfileUserInput value={name} name="Nome" setValue={updateName} />
                    <ProfileUserInput value={email} name="Email" setValue={updateEmail}    />
                    <ProfileUserInput value={cpf} name="CPF" setValue={updateCpf}  />
                    <ProfileUserInput value={phone} name="Numero" setValue={updateNumber}   />
                    <View style={styles.buttonsContainer}>
                        <Button
                            onPress={() => handleEditUser()}
                            icon={() => <Ionicons name="save" color="black" size={25}/>}
                            color="black"
                            style={{marginRight: 12, backgroundColor: 'white', width: '40%', alignSelf: 'center', marginTop: 30}}
                        >
                            SALVAR 
                        </Button>
                        <Button
                            onPress={() => navigation.navigate("Cupom", {user: user.user})}
                            icon={() => <Ionicons name="book" color="black" size={25}/>}
                            color="black"
                            style={{marginLeft: 12, backgroundColor: 'white', width: '40%', alignSelf: 'center', marginTop: 30}}
                        >
                            CUPOM
                        </Button>
                    </View>

                </View>
            </View>
        </SafeAreaView>
    )
}
