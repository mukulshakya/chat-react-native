import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-easy-toast";
import AsyncStorage from '@react-native-community/async-storage';

import InputWithLabel from "../../components/auth/inputWithLabel";
import API from "../../services/apiService";

export default function Login() {
  const [payload, setPayload] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validFields, setValidFields] = useState({
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [isAllValid, setIsAllValid] = useState(false);

  const toastRef = useRef();

  const saveValue = (value, field) => {
    payload[field] = value;
    setPayload(payload);
    const { username, email, password, confirmPassword } = payload;
    if (field === "username") {
      const pattern = /^[a-z]{3,20}$/i;
      validFields.username = pattern.test(username);
    } else if (field === "email") {
      const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
      validFields.email = pattern.test(email);
    } else if (field === "password") {
      const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
      validFields.password = pattern.test(password);
    } else if (field === "confirmPassword") {
      validFields.confirmPassword = password === confirmPassword;
    }
    setValidFields(validFields);
    setIsAllValid(Object.values(validFields).every((field) => field));
  };

  const submitForm = async () => {
    try {
      const response = await API.register(payload);
      const { message, success, data } = response.data;
      if (response.status === 200) {
        setIsSubmit(true);
        setIsSubmit(false);
        const emptyPayload = {};
        Object.keys(payload).forEach((key) => (emptyPayload[key] = null));
        setPayload(emptyPayload);
        setValidFields(emptyPayload);
        toastRef.current.show(message);
        if (success) {
          await AsyncStorage.setItem("token", data.token);
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
          props.navigation.navigate("Home");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const labels = ["Usename", "Email", "Password", "Confirm Password"];
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
        <Text style={styles.btnText}>Sign Up</Text>
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
