import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    },
    cuponsLabelsContainer: {
        marginTop: 20,
        paddingLeft: 50,
        paddingRight: 95,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 30,
    },
    cuponsHistory: {
        marginTop: 20,
        paddingLeft: 40,
        paddingRight: 10,
        height: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    purchaseInput: {
        alignSelf: 'center', 
        width: 200, 
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 10,
        marginTop: 15,
        height: 40,
        paddingLeft: 20,
    }
    
});
