//Import React
import React , { Component, useState } from 'react';

//Import all required component
import { Button } from 'native-base';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Alert,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    Navigator
  } from 'react-native';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 
  import { useForm } from "react-hook-form";


const pedido = ({navigation}) => {
  const [items, setItems] = useState(['Nombre']);
  const [itemsFiltrados, setItemsFiltrados] = useState(items) 


  global.currentScreenIndex = 'pedido';
  const searchItem = (text) => {
    const filteredItems = items.filter((item) => item.includes(text))
    console.log(filteredItems)
    setItemsFiltrados(filteredItems)
  
  }
  const renderResults = () => {
    return (itemsFiltrados.map((item) => <Text>{item}</Text>))
  }

    return (
      <KeyboardAwareScrollView>
      <View style={styles.mainBody}>
      <View style={{flex: 1, flexDirection: 'row-reverse'}}>
      <Image
              source={require('../../Image/logo2.png')}
              style={{
              width: 80,
              height: 80,
              resizeMode: 'contain',
              margin: 0,
              }}
      />
   <Text style={{ fontSize: 32, margin: 5 , padding: 20, color: 'white'}}>
     Crear Orden
    </Text>
    </View>
    <View style={{ flex: 2, alignItems: 'center', marginTop: 0 }}>
    <TextInput
      style={{ height: 40, borderColor: 'black', borderWidth: 1,padding: 10 }}
        />
      {renderResults()}  
    </View>
    </View>
    </KeyboardAwareScrollView>
    );
  
};


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


    } 
);
export default pedido;