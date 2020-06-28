import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, TextInput, Text } from "react-native";

export default function InputWithLabel({
  label,
  passValue,
  validFields,
  clear,
  field,
}) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    validFields &&
      typeof validFields[field] === "boolean" &&
      setIsValid(validFields[field]);
    clear && setValue("");
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, value && !isValid && { borderColor: "red" }]}
        value={value}
        placeholder={"Enter " + label}
        placeholderTextColor="gray"
        onChangeText={(text) => (setValue(text), passValue(text))}
      />
      <Text style={[styles.checkValue, !isValid && { color: "red" }]}>
        {value ? (isValid ? "✓" : "✕") : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    display: "flex",
    // height: 300,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 5,
  },
  label: {
    flex: 1.5,
    // width: 50,
    // height: 50,
  },
  input: {
    flex: 5,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    color: "black",
    paddingLeft: 10,
    paddingRight: 30,
  },
  checkValue: { position: "absolute", right: "5%", color: "green" },
});
