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
const productsLocation = {
  A1: ["#001", "#002"],
  A2: ["#009", "#016"],
  A3: ["#005", "#013"],
  B1: ["#102", "#222"],
  C1: ["#666", "#004"],
};
const productsStock = {
  "#001": 658,
  "#002": 365,
  "#009": 51,
  "#016": 47,
  "#005": 5,
  "#013": 15,
  "#102": 465,
  "#222": 169,
  "#666": 666,
  "#004": 78,
};
const getKeyByValue = (dict, productId) => {
  return Object.keys(dict).find(
    (key) => dict[key].filter((product) => product === productId).length
  );
};
const bodega = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  global.currentScreenIndex = "bodega";
  const renderResults = () => {
    if (searchQuery === "") {
      return null;
    }
    const filteredProducts = [];
    Object.keys(productsLocation).map(function (key, index) {
      const filterProducts = productsLocation[key].filter((product) =>
        product.includes(searchQuery)
      );
      filteredProducts.push(...filterProducts);
    });
    const searchResults = filteredProducts.map((filteredProduct) => {
      const stock = productsStock[filteredProduct];
      return {
        productId: filteredProduct,
        stock,
        location: getKeyByValue(productsLocation, filteredProduct),
      };
    });
    return searchResults.map((searchResult) => (
      <Text
        style={{ paddingHorizontal: 15 }}
      >{`El producto ${searchResult.productId} se encuentra en ${searchResult.location} y tiene un stock de ${searchResult.stock}.`}</Text>
    ));
  };
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
        <View style={{ flex: 5, alignItems: "center", marginTop: 5 }}>
          <>
            <Image
              source={require("../../Image/mapalogo.png")}
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
        <Searchbar
          placeholder="Buscar item"
          onChangeText={(query) => {
            setSearchQuery(query);
          }}
          value={searchQuery}
        />
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
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#E56C7A",
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
});
export default bodega;
