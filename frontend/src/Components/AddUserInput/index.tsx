//React
import React from 'react';

//React-native
import {  Text, TextInput, View } from 'react-native';

//Styles
import { styles } from './styles';


interface AddUserInput {
  setValue: (value: string) => void;
  name: string;
  isPhone?: boolean;
}

export function AddUserInput({setValue, name, isPhone }: AddUserInput) {
  if(isPhone) {
    return (
      <View style={styles.inputsContainer}>
        <Text style={{fontFamily: "Poppins-Regular", fontSize: 20}}>{name}</Text>
        <TextInput  style={styles.textInput} onChangeText={(text)=>{setValue(text)}}>55</TextInput>
      </View>
    )
  }
  return (
    <View style={styles.inputsContainer}>
        <Text style={{fontFamily: "Poppins-Regular", fontSize: 20}}>{name}</Text>
        <TextInput  style={styles.textInput} onChangeText={(text)=>{setValue(text)}}></TextInput>
    </View>
  )
}