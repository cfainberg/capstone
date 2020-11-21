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
import AsyncStorage from "@react-native-community/async-storage";
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
  const [actualPage, setActualPage] = useState("1");
  const [actualPageProducts, setActualPageProducts] = useState([]);
  const [location, setLocation] = useState("");
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  global.currentScreenIndex = "bodega";
  useEffect(() => {
    const get_products = async () => {
      await AsyncStorage.getItem("authorization").then((token) => {
        var bearer_token = "Bearer " + token;
        let products_url =
          BASE_URL + "sale/GetProducts?status=1&itemsPerPage=250&pageNumber=1";

        fetch(products_url, {
          method: "GET",
          headers: {
            Authorization: bearer_token,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then(async (responseJson) => {
            //Hide Loader
            let tempProducts = [];
            const tempTotalPages = Math.ceil(responseJson.totalItems / 250);
            // tempProducts = [...tempProducts, ...responseJson.productList];
            for (let i = 1; i < tempTotalPages + 1; i++) {
              const itemsLeft = responseJson.totalItems - tempProducts.length;
              const nextPageItems = itemsLeft >= 250 ? 250 : itemsLeft;
              let products_url =
                BASE_URL +
                `sale/GetProducts?status=1&itemsPerPage=${nextPageItems}&pageNumber=${i}`;
              await fetch(products_url, {
                method: "GET",
                headers: {
                  Authorization: bearer_token,
                  "Content-Type": "application/json",
                },
              })
                .then((response) => {
                  return response.json();
                })
                .then((responseJson) => {
                  tempProducts = [...tempProducts, ...responseJson.productList];
                });
              await new Promise((r) => setTimeout(r, 100));
            }
            setTotalPages(tempTotalPages);
            setProducts(tempProducts);
            setActualPageProducts(tempProducts.slice(0, 251));
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
          .catch((error) => {
            //Hide Loader
            // setLoading(false);
            console.error(error);
          });
      });
    };
    get_products();
  }, []);
  useEffect(() => {
    const tempActualPageProducts = products.slice(
      (actualPage - 1) * 250,
      parseInt(actualPage, 10) === totalPages
        ? products.length
        : actualPage * 250 + 1
    );
    setActualPageProducts(tempActualPageProducts);
  }, [actualPage]);
  const filterProducts = () => {
    if (searchQuery === "") {
      return actualPageProducts;
    }
    return actualPageProducts.filter((product) =>
      product.code.includes(searchQuery)
    );
  };
  const renderPages = () => {
    const pagesButtons = [];
    for (let i = 1; i < totalPages + 1; i++) {
      const isActualPage = i === parseInt(actualPage, 10);
      pagesButtons.push(
        <Button
          key={i}
          style={{
            backgroundColor: isActualPage ? "black" : "#a3003c",
            borderWidth: 0,
            color: "white",
            borderColor: "#a3003c",
            height: 40,
            alignSelf: "center",
            marginLeft: 40,
            marginRight: 40,
            marginTop: 30,
            marginBottom: 30,
          }}
          onPress={() => {
            setActualPage(i);
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: "white",
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            {i}
          </Text>
        </Button>
      );
    }
    return pagesButtons;
  };
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
    const filteredProducts = filterProducts();
    return filteredProducts.map((product) => (
      <Text
        // key={product.code}
        style={{ paddingHorizontal: 15 }}
      >{`El producto ${product.code} tiene un stock de ${product.stock}.`}</Text>
    ));
  };
  console.log("RENDER");
  return (
    <>
      <View style={{ flex: 1 }}>
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
      <View
        style={{
          flexDirection: "row",
          marginLeft: 10,
          justifyContent: "space-around",
        }}
      >
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
