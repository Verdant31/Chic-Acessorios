//React
import React from 'react';

//Components
import { Searchbar } from 'react-native-paper';

//MaterialIcon
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';


//Styles
import { styles } from './styles';

interface SearchBarProps {
    name: string;
    setName: (name: string) => void;
}

export function SearchBar({name, setName}: SearchBarProps) {
    
    return(
        <Searchbar
          icon={() => <MaterialCommunityIcon name="database-search" color="black" size={30}/>}
          placeholder="Procurar uma cliente"
          value={name}
          onChangeText={setName}
          style={styles.searchBarStyle}
        />
    )
}
