//Import React
import React from "react";

//Import all required component
import { Button } from "native-base";
import Layout from "../../constants/Layout";
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
} from "react-native";

const inventario = ({ navigation }) => {
  global.currentScreenIndex = "inventario";
  return (
    <View style={styles.mainBody}>
      <View style={{ flex: 1, alignItems: "center", marginTop: 100 }}>
        <Image
          source={require("../../Image/logo2.png")}
          style={{
            width: "50%",
            height: 150,
            // resizeMode: 'center',
            margin: 5,
          }}
        />
        <Button
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("inventarioAdd")}
        >
          <Text style={styles.inputStyle}>AGREGAR</Text>
        </Button>
        <Button
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("inventarioDel")}
        >
          <Text style={styles.inputStyle}>ELIMINAR</Text>
        </Button>
        <Button
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("bodega")}
        >
          <Text style={styles.inputStyle}>BUSCAR</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingLeft: Layout.responsiveWidth(33),
    alignSelf: "center",
  },
});
export default inventario;
