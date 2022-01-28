//React
import React from 'react';

//React-native
import { Text, View, Alert } from 'react-native';

//Styles
import {styles} from './styles';

//Icons
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

//React-native-paper
import { Button } from 'react-native-paper';

//Components and others
import {RootStackParamList} from '../../pages/RootStackParams';

//React-navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

//Types
import { User } from '../../Types/user';

//Api
import { api } from '../../Services/api';

//Hooks
import { useUsers } from '../../Hooks/useUsers';

interface UserProps {
    user: User;
}

type UsersScreenProp = NativeStackNavigationProp<RootStackParamList, 'Usuários'>;


export function UserCard({user}: UserProps) {
    const navigation = useNavigation<UsersScreenProp>();

    const { refetch } = useUsers();

    async function handleDeleteUser() {
        try {
            await api.delete(`/users/deleteuser/${user.id}`).then((response) => {
                refetch();
            })
        }catch (err) {
            Alert.alert(String(err))
        }
    }

    return (
        <View style={styles.userContainer} >
            <View style={styles.avatarView}>
                <Button
                    icon={() => <MaterialCommunityIcon name="face-woman" color="black" size={30}/>}
                    onPress={() => {
                        navigation.navigate('User', {
                            user: {
                                name:  user.username,
                                email: user.email,
                                id: user.id,
                                phone: user.phone,
                                cpf: user.cpf,
                                cupom: {
                                    name: user.cupom.name,
                                    generationDate: user.cupom.generationDate,
                                    expirationDate: user.cupom.expirationDate
                                }
                            }
                        });
                    }}
                >
                </Button>
            </View>

            <View style={styles.userInfoView}>
                <View style={{width: '60%'}}>
                    <Text style={{color: 'black'}}>{user.username}</Text>
                    <Text style={{color: 'black'}}>{user.email}</Text>
                </View>
                <Button
                    onPress={() => {
                        Alert.alert(
                            "Deletar cliente",
                            "Tem certeza que deseja deletar essa(e) cliente?",
                            [
                                {
                                    text: "Sair",
                                    style: "cancel",
                                },
                              {
                                    text: "Deletar",
                                    onPress: () => handleDeleteUser(),
                                    style: "cancel",
                              },
                            ],
                            {
                              cancelable: true,
                              onDismiss: () =>
                                Alert.alert(
                                  "This alert was dismissed by tapping outside of the alert dialog."
                                ),
                            }
                          );
                    }}
                    icon={() => <Ionicons name="trash" color="black" size={30}/>}
                    color="#fff"
                >
                </Button>
            </View>
        </View>
    )
}
