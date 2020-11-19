//Import React
import React, { Component, useEffect, useState } from "react";

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
import AsyncStorage from '@react-native-community/async-storage';
import SearchBar from "../../components/Searchbar.tsx";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
let { height, width } = Dimensions.get("window");

const getKeyByValue = (dict, productId) => {
  return Object.keys(dict).find(
    (key) => dict[key].filter((product) => product === productId).length
  );
};
const bodega = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState('0')
  const [location, setLocation] = useState("");
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  global.currentScreenIndex = "bodega";
  console.log(totalPages)
  useEffect(()=> {
    const get_products = async () => {
       await AsyncStorage.getItem('authorization').then((token) => {
        var bearer_token = 'Bearer ' + token;
        let products_url = BASE_URL + 'sale/GetProducts?status=1&itemsPerPage=250&pageNumber=' + pageNumber
        fetch(products_url, {
          method: 'GET',
          headers: {
            'Authorization': bearer_token,
            'Content-Type': 'application/json'
        }
        }).then(response => {
          return response.json()})
          .then(responseJson => {
            //Hide Loader
            setTotalPages(Math.ceil(responseJson.totalItems /250))
            setProducts(responseJson.productList)
            // setLoading(false);
            // console.log(responseJson);
            // If server response message same as Data Matched
            // if (responseJson.success) {
            //   AsyncStorage.setItem('autorization', responseJson.authResult.access_token);
            //   props.navigation.navigate('DrawerNavigationRoutes');
            // } else {
            //   setErrortext('Please check your email id or password');
            //   console.log('Please check your email id or password');
            // }
          })
          .catch(error => {
            //Hide Loader
            // setLoading(false);
            console.error(error);
          });
        
      })
    }
    get_products()
  }, [])
  const filterProducts = () => {
    if (searchQuery === '') {
      return products;
    }
    return products.filter((product) => product.code.includes(searchQuery))
  }
  const renderPages = () => {
    const pagesButtons = []
    for (let i = 0; i < totalPages; i++){
      pagesButtons.push(    <Button key={i} style={styles.buttonStyle}>
        <Text style={styles.inputStyle}>{i + 1}</Text>
      </Button>)
    }
    return pagesButtons;
  }
  const renderResults = () => {
    // if (searchQuery === "") {
    //   return null;
    // }
    // const filteredProducts = [];
    // Object.keys(productsLocation).map(function (key, index) {
    //   const filterProducts = productsLocation[key].filter((product) =>
    //     product.includes(searchQuery)
    //   );
    //   filteredProducts.push(...filterProducts);
    // });
    // const searchResults = filteredProducts.map((filteredProduct) => {
    //   const stock = productsStock[filteredProduct];
    //   return {
    //     productId: filteredProduct,
    //     stock,
    //     location: getKeyByValue(productsLocation, filteredProduct),
    //   };
    // });
    const filteredProducts = filterProducts()
    return filteredProducts.map((product) => (
      <Text key={product.code}
        style={{ paddingHorizontal: 15 }}
      >{`El producto ${product.code} tiene un stock de ${product.stock}.`}</Text>
    ));
  };
  return (
    <>
    <View style={{flex: 1}}>
    <ScrollView
      behavior={"padding"}
      enabled
      style={styles.scrollView}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={true}
    >
      <View style={styles.mainBody}>
      <Searchbar
          placeholder="Buscar item"
          onChangeText={(query) => {
            setSearchQuery(query);
          }}
          value={searchQuery}
        />
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
            {renderResults()}
          </>
        </View>
      </View>
    </ScrollView>
    </View>
    <View style={{ flexDirection: "row" ,marginLeft: 20, justifyContent: 'space-evenly'}}>
    {renderPages()}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 120,

    backgroundColor: "transparent",
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
    marginLeft: 40,
    marginRight: 40,
    marginTop: 30,
    marginBottom: 30,
  },

  inputStyle: {
    // flex: 1,
    color: "white",
    paddingLeft: 10,
    alignSelf: "center",
    paddingRight: 10,
  },
});
export default bodega;
