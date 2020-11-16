//Import React
import React, { Component, useState } from "react";

//Import all required component
import { Button } from "native-base";
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Searchbar } from "react-native-paper";
import SearchBar from "../../components/Searchbar.tsx";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
let { height, width } = Dimensions.get("window");

const inventarioAdd = () => {
  let [nombre, setNombre] = useState('');
  let [cantidad, setCantidad] = useState('');
  global.currentScreenIndex = "InventarioAdd";

  handleSubmit = (nombre, cantidad) => {

    setErrortext('');
    if (!nombre) {
      alert('Ingrese Nombre del Producto');
      return;
    }
    if (!cantidad) {
      alert('Ingrese CAntidad del Producto a Agregar');
      return;
    }
    for (i in length(global.productsStock)){
      if (nombre == global.productsStock[i] ){
        global.productsStock[i] += cantidad
        return;
      }
     else {
       alert('Nombre de Producto Incorrecto')
       return;
     } 
    } 
    
  }
  
  return ( 
    <KeyboardAwareScrollView
      behavior={"padding"}
      enabled
      style={styles.scrollView}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{ flex: 1 }}s
      scrollEnabled={true}
    >
      <View style={styles.mainBody}>
        <View style={{ flex: 5, alignItems: "center", marginTop: 5 }}>
          <>
            <Image
              source={require("../../Image/mapa.jpg")}
              style={{
                width: 300,
                height: 190,
                resizeMode: "contain",
                margin: 0,
              }}
            />
                   <View >
    <TextInput
      placeholder="Nombre del Producto"
      style={styles.textInput}
      maxLength={30}
      onBlur={Keyboard.dismiss} 
      value={nombre}

    />
        <TextInput
      placeholder="Cantidad del Producto"
      style={styles.textInput}
      
      keyboardType="number-pad"
      
      onBlur={Keyboard.dismiss} 
      value={cantidad}
    />
  </View>
           
          </>
          
        </View>
        <View style={styles.inputContainer}>
  <TouchableOpacity
    style={styles.saveButton}
    onChangeText={this.handleSubmit}
  >
    <Text style={styles.saveButtonText}>Save</Text>
  </TouchableOpacity>
</View>

              
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 120,

    backgroundColor: "transparent",
  },
  inputContainer: {
    paddingTop: 15
  },
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  buttonStyle: {
    backgroundColor: "#a3003c",
    borderWidth: 0,
    color: "white",
    borderColor: "#a3003c",
    height: 40,
    alignSelf: "center",
    borderRadius: 30,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 30,
    marginBottom: 30,
  },

  inputStyle: {
    flex: 1,
    color: "white",
    paddingLeft: 95,
    alignSelf: "center",
    paddingRight: 5,
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#E56C7A',
    backgroundColor: '#E56C7A',
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center'
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  }
  
});

export default inventarioAdd;


