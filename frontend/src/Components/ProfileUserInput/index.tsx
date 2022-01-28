//React
import React from 'react';

//React-native
import {  Text, TextInput, View } from 'react-native';

//Styles
import { styles } from './styles';


interface AddUserInput {
  setValue: (value: string) => void;
  name: string;
  value: string;
}

export function ProfileUserInput({setValue, name, value}: AddUserInput) {
  return (
    <View style={styles.profileContainer}>
        <Text style={styles.infoText}>{name}</Text>
        <TextInput  style={styles.textInfoInput} onChangeText={(text)=>{setValue(text)}}>{value}</TextInput>
    </View>
  )
}