//React
import React, { useState } from 'react';

//React-native
import {  Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, ScrollViewComponent, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

//Components and others
import { AddUserInput } from '../../Components/AddUserInput';

//API
import { api } from '../../Services/api';

//Styles
import { styles } from './styles';

export default function AddUser() {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ cpf, setCpf ] = useState('');
    const [ phone, setNumber ] = useState('');
    const [ isLoading, setLoading ] = useState(false)

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


    async function addUser() {
        setLoading(true);
        await api.post("/users/register", {
            username: name,
            email: email,
            cpf: cpf,
            phone: phone
        }).then(() => {
            setLoading(false);
            Alert.alert("Usuario adicionado com sucesso");
        }).catch((err) => {
            Alert.alert(err)
        })
    }

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
                    <AddUserInput name="Nome" setValue={updateName} />
                    <AddUserInput name="Email" setValue={updateEmail}    />
                    
                    <AddUserInput name="CPF" setValue={updateCpf}  />
                    <AddUserInput name="Numero" setValue={updateNumber} isPhone />

                    
                    <View style={{alignItems: 'center', marginBottom: 40}}>
                        <Pressable onPress={() => {addUser()}} style={styles.saveUserButton}>
                            <Text style={{color: 'black', fontSize: 20,  fontFamily: 'Poppins-Bold' }}>Salvar Usuario</Text>
                        </Pressable>
                    </View>

                    {isLoading && 
                      <ActivityIndicator size="large" color="white" />
                    }
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
    
}
