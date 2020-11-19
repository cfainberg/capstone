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
  const [nombre, setNombre] = useState(['']);
  const [rut, setRUT] = useState(['']);
  const [producto, setproducto] = useState(['']);
  const [cantidad, setcantidad] = useState(['']);
  let [errortext, setErrortext] = useState(''); 


  global.currentScreenIndex = 'pedido';

  const handleSubmitPress = () => {
    setErrortext('');
    if (!nombre) {
      alert('Por favor rellenar nombre');
      return;
    }
    if (!rut) {
      alert('Por favor rellenar RUT');
      return;
    }

  };

  // const renderResults = () => {
  //   return (itemsFiltrados.map((item) => <Text>{item}</Text>))
  // }

    return (
      <KeyboardAwareScrollView
            behavior={"padding"}
            enabled
            style={styles.scrollView}
           resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{ flex: 1 }}
            scrollEnabled={true}
      >
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
    placeholder="Nombre Empresa"
      style={styles.input}
      underlineColorAndroid = "transparent"
      value={nombre}
      
        />
    <Text style={{ fontSize: 7, margin: 0 , padding:0, color: 'white'}}>
      -------------------------------------------------------------------------------------------
    </Text>
      {/* {renderResults()}   */}
      <TextInput
      placeholder="RUT Empresa"
      style={styles.input}
      value={rut}
        />
      {/* {renderResults()}   */}
      <Text style={{ fontSize: 7, margin: 0 , padding:0, color: 'white'}}>
      -------------------------------------------------------------------------------------------
    </Text>
    <TextInput
      placeholder="Producto"
      style={styles.input}
      value={producto}
        />
            <TextInput
      placeholder="Cantidad Producto"
      style={styles.input}
      value={cantidad}
        />
      <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>Submit</Text>
            </TouchableOpacity>
    </View>

    </View>
    </KeyboardAwareScrollView>
    );
  
};


const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    input: {
      margin: 15,
      height: 40,
      borderColor: 'transparent',
      borderWidth: 1
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