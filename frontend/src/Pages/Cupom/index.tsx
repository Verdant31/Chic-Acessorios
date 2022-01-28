import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert, Linking, RefreshControl, ScrollView, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useUsers } from "../../Hooks/useUsers";
import { api } from "../../Services/api";
import { RootStackParamList } from "../RootStackParams";
import { styles } from "./styles";

type CupomScreenRouteProp = RouteProp<RootStackParamList, 'Cupom'>;
type CupomScreenProp = NativeStackNavigationProp<RootStackParamList, 'AddUser'>;

export default function Cupom() {
  const route = useRoute<CupomScreenRouteProp>();
  const navigation = useNavigation<CupomScreenProp>()
  const [ purchaseValue, setPurchaseValue ] = useState('');
  const user = route.params.user;
  if(Number(purchaseValue) >= 100 && Number(purchaseValue) < 200 ) setPurchaseValue('CUPOM10');
  if(Number(purchaseValue) >= 200 && Number(purchaseValue) < 300) setPurchaseValue('CUPOM20');
  if(Number(purchaseValue) >= 300) setPurchaseValue('CUPOM30');

  async function generateCupom() {
    console.log(purchaseValue)
    let msg = `Prezado cliente,` + "\n" +
    `A CHIC Acessórios agradece a preferência e como "cliente especial",` + "\n" +
    `VOCÊ acaba de ganhar um ${purchaseValue} para a sua próxima compra.`+ "\n" +
    `** Lembrando que o seu bônus é válido por 30 dias.`+ "\n" +
    `Até breve!`+ "\n" +
    `Um abraço,`+ "\n" +
    `CHIC Acessórios`
    await api.put('/cupom/addcupom', {
      id: user.id,
      value: purchaseValue,
      email: user.email
    }).then((response) => {
      Alert.alert(response.data.message);
      Linking.openURL(`whatsapp://send?text=${msg}&phone=${user.phone}`);
    }).catch((err) => {
      Alert.alert(err.message);
    })
  }

  async function deleteCupom() {
    await api.delete(`/cupom/deletecupom/${user.id}`)
      .then((response) => {
        Alert.alert(response.data.message);
        navigation.navigate("Usuários")
      }).catch((err) => {
        Alert.alert(err.message)
      })
  }

  return (
    <SafeAreaView style={styles.container} >
       {user.cupom?.name
          ? (
            <>
              <Text style={{alignSelf: 'center', marginTop: 20, fontSize: 20}}>Atual</Text>
                <View style={styles.cuponsLabelsContainer}>
                  <Text style={{fontSize: 18}}>Nome</Text>
                  <Text style={{fontSize: 18}}>Criação</Text>
                  <Text style={{fontSize: 18}}>Expiração</Text>
                </View>
              <View style={{height: '40%'}}>
                <ScrollView>
                  <View style={styles.cuponsHistory}>
                    <Text style={{color: 'white'}}>{user.cupom?.name}</Text>
                    <Text style={{color: 'white'}}>{user.cupom?.generationDate}</Text>
                    <Text style={{color: 'white'}}>{user.cupom?.expirationDate}</Text>
                    <Button
                      onPress={() => deleteCupom()}
                      icon={() => <Ionicons name="trash" color="white" size={25}/>}
                      color="black"
                    >
                  </Button>
                  </View>
                </ScrollView>
              </View>
            </>
          )
          : (
            <View style={{height: '20%', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 20}}>Não há cupom ativo para esse usuário.</Text>
            </View>
          )
        }
        <View style={{height: '100%'}}>
          <Text style={{alignSelf: 'center', fontSize: 22, color: 'white'}}>Entre com o valor da compra</Text>
          <TextInput onChangeText={(text)=>{setPurchaseValue(text)}}  keyboardType='numeric' style={styles.purchaseInput}></TextInput>
          <Button
            style={{backgroundColor: 'white', width: '60%', alignSelf: 'center', marginTop: 40}}
            onPress={() => generateCupom()}
            icon={() => <Ionicons name="add" color="black" size={25}/>}
            color="black"
             >
               Gerar Cupom
            </Button>
        </View>
    </SafeAreaView>
  )
}