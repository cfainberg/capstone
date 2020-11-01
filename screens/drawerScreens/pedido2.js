import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import Input from "@material-ui/core/Input";
import Select from "react-select";
import { Input as StrapInput } from "reactstrap";
import { Input as AntdInput } from "antd";
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

import "./index.css";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const MyInput = ({ name, label, register }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input name={name} placeholder=" " ref={register} />
    </>
  );
};

const pedido2 = ({navigation}) => {
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = data => {
    alert(JSON.stringify(data, null));
  };
  const [values, setReactSelect] = useState({
    selectedOption: []
  });

  const handleMultiChange = selectedOption => {
    setValue("reactSelect", selectedOption);
    setReactSelect({ selectedOption });
  };

  const hanleChange = e => {
    setValue("antDInput", e.target.value);
  };

  useEffect(() => {
    register({ name: "reactSelect" });
    register({ name: "antDInput" });
  }, [register]);

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
      </View>
      </View>
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            style={{
              marginBottom: "20px"
            }}
            name="HelloWorld"
            inputRef={register}
            placeholder="Material UI - Input"
            inputProps={{
              "aria-label": "Description"
            }}
          />
        </div>

        <div>
          <Input
            name="antDInput"
            onChange={hanleChange}
            placeholder="antDInput"
          />
        </div>

        <div>
          <StrapInput
            placeholder="Strap - Input"
            name="strapInput"
            innerRef={register}
          />
        </div>

        <div>
          <lable className="reactSelectLabel">React select</lable>
          <Select
            className="reactSelect"
            name="filters"
            placeholder="Filters"
            value={values.selectedOption}
            options={options}
            onChange={handleMultiChange}
            isMulti
          />
        </div>

        <div>
          <MyInput name="firstName" label="Nombre" register={register} />
        </div>

        <div>
          <label htmlFor="lastName">RUT</label>
          <input name="lastName"  ref={register} />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            ref={register}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </KeyboardAwareScrollView>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
/*https://codesandbox.io/s/72j69vnk1x?file=/src/index.js:0-2986*/ 
export default pedido2;