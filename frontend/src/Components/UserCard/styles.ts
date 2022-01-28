import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   userContainer: {  
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',

    width: '90%',
    height: 60,
    
    marginTop: 30,

    backgroundColor: 'white',
    borderRadius: 25,
   },

   avatarView: {
      alignItems: 'flex-start',
      height: 60,
      width: '20%',
      paddingTop: 10,
   },

   userInfoView: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      height: 60,
      width: '100%',
      paddingTop: 10,
   },
 
});
