//Import React
import React , { Component, useState } from 'react';

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
  } from 'react-native';

const bodega = () => {
  const [items, setItems] = useState(['#001', '#002', '#003', '#005', '#006']);
  const [itemsFiltrados, setItemsFiltrados] = useState(items)
  global.currentScreenIndex = 'bodega';
  const searchItem = (text) => {
    const filteredItems = items.filter((item) => item.includes(text))
    console.log(filteredItems)
    setItemsFiltrados(filteredItems)
  
  }
  const renderResults = () => {
    return (itemsFiltrados.map((item) => <Text>{item}</Text>))
  }
  return ( 
    <View style={styles.mainBody}>
        <View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
            <Image
                    source={require('../../Image/logo2.png')}
                    style={{
                    width: '50%',
                    height: 150,
                    // resizeMode: 'center',
                    margin: 5,
                    }}
            />

        </View>
        <View style={{ flex: 2, alignItems: 'center', marginTop: 0 }}>
   
      <TextInput
      style={{ height: 40, borderColor: 'black', borderWidth: 1 }}
       onChangeText={text => searchItem(text)} />
      {renderResults()}  
        </View>
    </View>
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
export default bodega;