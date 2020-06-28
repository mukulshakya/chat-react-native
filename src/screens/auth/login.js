import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import Toast from "react-native-easy-toast";

import InputWithLabel from "../../components/auth/inputWithLabel";
import API from "../../services/apiService";

export default function Login(props) {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [validFields, setValidFields] = useState({
    email: null,
    password: null,
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [isAllValid, setIsAllValid] = useState(false);

  const toastRef = useRef();

  const saveValue = (value, field) => {
    payload[field] = value;
    setPayload(payload);
    const { email, password } = payload;
    if (field === "email") {
      const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
      validFields.email = pattern.test(email);
    } else if (field === "password") {
      const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
      validFields.password = pattern.test(password);
    }
    setValidFields(validFields);
    setIsAllValid(Object.values(validFields).every((field) => field));
  };

  const submitForm = async () => {
    try {
      const response = await API.login(payload);
      if (response.status === 200) {
        const { message, success, data } = response.data;
        toastRef.current.show(message);
        if (success) {
          setIsSubmit(true);
          setIsSubmit(false);
          const emptyPayload = {};
          Object.keys(payload).forEach((key) => (emptyPayload[key] = null));
          setPayload(emptyPayload);
          setValidFields(emptyPayload);
          await AsyncStorage.setItem("token", data.token);
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
          props.navigation.navigate("Home");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const labels = ["Email", "Password"];
  return (
    <View style={styles.container}>
      {Object.keys(payload).map((key, index) => {
        return (
          <InputWithLabel
            key={key}
            label={labels[index]}
            passValue={(value) => saveValue(value, key)}
            payload={payload}
            clear={isSubmit}
            validFields={validFields}
            field={key}
          />
        );
      })}
      <TouchableOpacity
        disabled={!isAllValid}
        style={[styles.button, !isAllValid && { backgroundColor: "grey" }]}
        onPress={() => submitForm()}
      >
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <Toast
        ref={toastRef}
        style={{ backgroundColor: "#444444" }}
        position="bottom"
        fadeInDuration={500}
        fadeOutDuration={2000}
        positionValue={170}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "royalblue",
    color: "white",
    width: "50%",
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  btnText: { color: "white", textAlign: "center", fontWeight: "bold" },
});
