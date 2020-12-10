//Import React
import React, { Component, useState, useEffect } from "react";
import { Row, Col } from "react-native-easy-grid";
import { Icon, Right } from "native-base";
import { TextField } from "react-native-material-textfield";
import styled from "styled-components";
//Import all required component
GLOBAL = require("../../globals");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);
import { Button } from "native-base";
import { NavigationActions } from "react-navigation";
import emailjs from "emailjs-com";
import Modal from "react-native-modal";
import Layout from "../../constants/Layout";
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
  Navigator,
} from "react-native";
import SmtpMailer from "react-native-smtp-mailer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm } from "react-hook-form";

const pedido = ({ navigation }) => {
  const nameRef = React.createRef();
  const rutRef = React.createRef();
  const productRef = React.createRef();
  const quantityRef = React.createRef();
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [visible, setVisible] = useState(false);
  const [rut, setRUT] = useState(" ");
  const [product, setProduct] = useState(" ");
  const [quantity, setQuantity] = useState(" ");
  let [errortext, setErrortext] = useState("");
  global.currentScreenIndex = "pedido";
  const sendEmail = () => {
    const msg = {
      to: email,
      from: "bastian@kimche.cl", // Use the email address or domain you verified above
      subject: "Cotillon Parada: nueva orden creada",
      text: `A continuación se muestra la información del pedido realizado:
      Nombre: ${name}
      RUT: ${rut}
      Producto: ${product}
      Cantidad de producto: ${quantity}`,
    };
    sgMail.send(msg).then(
      (res) => {},
      (error) => {
        if (error.response) {
        }
      }
    );
  };
  const handleSubmitPress = async () => {
    setErrortext("");
    if (name === "" || name === " ") {
      Alert.alert(
        "Error",
        "Nombre no ingresado",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: false }
      );
      return;
    }
    if (rut === "" || rut === " ") {
      Alert.alert(
        "Error",
        "RUT no ingresado",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: false }
      );
      return;
    }
    if (product === "" || product === " ") {
      Alert.alert(
        "Error",
        "Producto no ingresado",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: false }
      );
      return;
    }
    if (quantity === "" || quantity === " ") {
      Alert.alert(
        "Error",
        "Cantidad de producto no ingresada",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: false }
      );
      return;
    }
    GLOBAL.orders.push({ name, rut, product, quantity });
    setVisible(true);
  };
  const renderModal = () => {
    return (
      <ModalView>
        <HeaderRow size={1}>
          <Col size={5}>
            <ModalText>Enviar pedido por correo</ModalText>
          </Col>
          <Col size={1}>
            <CloseIcon
              onPress={() => setVisible(false)}
              type="Entypo"
              name="cross"
            />
          </Col>
        </HeaderRow>
        <Separator />
        <CenteredRow size={6}>
          <EmailInputCol>
            <TextField
              label="Ingresar correo"
              labelOffset={{ y1: -10 }}
              value={email}
              inputContainerPadding={5}
              baseColor={"grey"}
              onChangeText={(text) => setEmail(text.toLowerCase())}
              autoCorrect={false}
              returnKeyType="next"
              enablesReturnKeyAutomatically
              style={{ alignSelf: "center" }}
              clearButtonMode="while-editing"
            />
          </EmailInputCol>
        </CenteredRow>
        <CenteredRow size={2}>
          <NextButton
            onPress={async () => {
              await sendEmail();
              Alert.alert(
                "",
                "Orden creada correctamente",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      setName(" ");
                      setRUT(" ");
                      setProduct(" ");
                      setQuantity(" ");
                      setEmail(" ");
                      navigation.dispatch(NavigationActions.back());
                    },
                  },
                ],
                { cancelable: false }
              );
            }}
            disabled={false}
          >
            <ButtonText>ENVIAR</ButtonText>
          </NextButton>
        </CenteredRow>
      </ModalView>
    );
  };
  useEffect(() => {
    if (nameRef.current && name !== "") {
      nameRef.current.setValue(name);
    }
  }, [name]);
  useEffect(() => {
    if (rutRef.current && rut !== "") {
      rutRef.current.setValue(rut);
    }
  }, [rut]);
  useEffect(() => {
    if (productRef.current && product !== "") {
      productRef.current.setValue(product);
    }
  }, [product]);
  useEffect(() => {
    if (quantityRef.current && quantity !== "") {
      quantityRef.current.setValue(quantity);
    }
  }, [quantity]);

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
        <View
          style={{
            flexDirection: "row",
            paddingLeft: Layout.responsiveWidth(25),
          }}
        >
          <Text
            style={{ fontSize: 32, margin: 5, padding: 20, color: "black" }}
          >
            Crear Orden
          </Text>
        </View>
        <View style={{ paddingBottom: Layout.responsiveHeight(13) }}></View>
        <View style={{ flex: 2, alignItems: "center", marginTop: 0 }}>
          <TextField
            autoCorrect={false}
            baseColor={"black"}
            lineWidth={2}
            clearButtonMode="while-editing"
            containerStyle={{
              width: "45%",
              alignSelf: "center",
            }}
            enablesReturnKeyAutomatically
            error={false ? "Debe ingresar un número entre 1 y 100" : ""}
            errorValue={false}
            inputContainerPadding={10}
            label="Nombre de la empresa"
            onChangeText={(text) => setName(text)}
            ref={nameRef}
            returnKeyType="next"
            value={name}
          />
          {/* {renderResults()}   */}
          <TextField
            autoCorrect={false}
            baseColor={"black"}
            lineWidth={2}
            clearButtonMode="while-editing"
            comparisonValue={"asd"}
            containerStyle={{
              width: "45%",
              alignSelf: "center",
            }}
            enablesReturnKeyAutomatically
            error={false ? "Debe ingresar un número entre 1 y 100" : ""}
            errorValue={false}
            inputContainerPadding={10}
            keyboardType="numeric"
            label="RUT Empresa"
            onChangeText={(text) => setRUT(text)}
            ref={rutRef}
            returnKeyType="next"
            value={rut}
          />
          {/* {renderResults()}   */}
          <TextField
            autoCorrect={false}
            baseColor={"black"}
            lineWidth={2}
            clearButtonMode="while-editing"
            comparisonValue={"asd"}
            containerStyle={{
              width: "45%",
              alignSelf: "center",
            }}
            enablesReturnKeyAutomatically
            error={false ? "Debe ingresar un número entre 1 y 100" : ""}
            errorValue={false}
            inputContainerPadding={10}
            label="Producto"
            onChangeText={(text) => setProduct(text)}
            ref={productRef}
            returnKeyType="next"
            value={product}
          />
          <TextField
            autoCorrect={false}
            baseColor={"black"}
            lineWidth={2}
            clearButtonMode="while-editing"
            comparisonValue={"asd"}
            containerStyle={{
              width: "45%",
              alignSelf: "center",
            }}
            enablesReturnKeyAutomatically
            error={false ? "Debe ingresar un número entre 1 y 100" : ""}
            errorValue={false}
            inputContainerPadding={10}
            keyboardType="numeric"
            label="Cantidad de producto"
            onChangeText={(text) => setQuantity(text)}
            ref={quantityRef}
            returnKeyType="next"
            value={quantity}
          />
          <View style={{ paddingBottom: Layout.responsiveHeight(5) }}></View>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitPress}
          >
            <Text style={styles.buttonTextStyle}>Crear</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationOutTiming={100}
        animationInTiming={400}
        backdropTransitionOutTiming={0}
        deviceWidth={Layout.responsiveWidth(100)}
        deviceHeight={Layout.responsiveHeight(100)}
        hideModalContentWhileAnimating
        key={0}
        animationIn="zoomIn"
        animationOut="zoomOut"
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
      >
        {renderModal()}
      </Modal>
    </KeyboardAwareScrollView>
  );
};

const ModalView = styled.View`
  align-self: center;
  background-color: white;
  border-radius: 5;
  height: ${Layout.responsiveHeight(40)};
  width: ${Layout.responsiveHeight(40)};
`;
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "transparent",
    borderWidth: 1,
  },
  buttonStyle: {
    backgroundColor: "#a3003c",
    borderWidth: 0,
    color: "white",
    borderColor: "#a3003c",
    height: Layout.responsiveWidth(13),
    alignSelf: "center",
    borderRadius: 30,
    marginLeft: 40,
    alignContent: "center",
    marginRight: 40,
    marginTop: 30,
    marginBottom: 30,
    width: Layout.responsiveWidth(40),
  },

  buttonTextStyle: {
    paddingTop: Layout.responsiveWidth(3.5),
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "white",
    paddingLeft: 95,
    alignSelf: "center",
    paddingRight: 5,
  },
});
const HeaderRow = styled(Row)`
  align-items: center;
  padding-horizontal: ${Layout.responsiveWidth(4)};
  padding-vertical: ${Layout.responsiveHeight(2)};
`;
const ModalText = styled.Text`
  color: grey;
  font-size: 16;
`;
const CloseIcon = styled(Icon)`
  align-self: flex-end;
  color: grey;
  font-size: 16;
`;
const Separator = styled.View`
  height: 1;
  background-color: grey;
`;
const CenteredRow = styled(Row)`
  align-items: center;
  justify-content: center;
`;
const EmailInputCol = styled(Col)`
  padding-horizontal: ${Layout.responsiveWidth(4)};
`;
const NextButton = styled(Button)`
  align-self: center;
  background-color: red;
  height: ${Layout.responsiveHeight(5)};
  justify-content: center;
  margin-vertical: ${Layout.responsiveHeight(2.5)};
  width: ${Layout.responsiveWidth(45)};
`;
const ButtonText = styled.Text`
  color: white;
  font-size: 16;
  text-align: center;
`;
export default pedido;
