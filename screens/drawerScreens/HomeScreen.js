
//Import React
import React, { useState } from 'react';

//Import all required component
import { Button } from 'native-base';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert
  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = ({navigation}) => {
  console.log(navigation);
  global.currentScreenIndex = 'HomeScreen';
  const handleClick = (screenToNavigate) => {
    if (screenToNavigate == 'logout') {
      //navigation.toggleDrawer();
      Alert.alert(
        'Logout',
        'Segurito?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              return null;
            },
          },
          {
            text: 'Confirm',
            onPress: () => {
              AsyncStorage.clear();
              navigation.navigate('Auth');
              console.log('logout');
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      navigation.toggleDrawer();
      global.currentScreenIndex = screenToNavigate;
      navigation.navigate(screenToNavigate);
    }
  };
  
  return (
    <View style={styles.mainBody}>
        <View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
            <Image
                    source={require('../../Image/logo.png')}
                    style={{
                    width: '50%',
                    height: 150,
                    // resizeMode: 'center',
                    margin: 5,
                    }}
            />
            <Button 
            style={styles.buttonStyle}
             onPress={() => navigation.navigate('pedido')}><Text style={styles.inputStyle}>CREAR ORDEN</Text></Button>
            <Button 
            style={styles.buttonStyle} 
            onPress={() => navigation.navigate('inventario')}><Text style={styles.inputStyle}>INVENTARIO</Text></Button>
            <Button 
            style={styles.buttonStyle} 
            onPress={() => handleClick('logout')}><Text style={styles.inputStyle}>LOGOUT</Text></Button>
        </View>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#E56C7A',
    },
    buttonStyle: {
      backgroundColor: '#a3003c',
      borderWidth: 0,
      color: 'white',
      borderColor: '#a3003c',
      height: 40,
      alignSelf: 'center',
      borderRadius: 30,
      marginLeft: 40,
      marginRight: 40,
      marginTop: 30,
      marginBottom: 30,
     },

     inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 95,
        alignSelf: 'center',
        paddingRight: 5,

      }

  });