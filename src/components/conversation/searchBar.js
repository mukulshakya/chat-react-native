import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";

import constants from "../../constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function SearchBar() {
  const [value, setValue] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder="Search"
        placeholderTextColor={constants.colors.chatDate}
        onChangeText={(text) => setValue(text)}
      />
      <MaterialCommunityIcons
        name={"magnify"}
        color={constants.colors.chatDate}
        size={24}
        style={styles.checkValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingBottom: 18 },
  input: {
    height: 50,
    borderWidth: 0.2,
    borderRadius: 8,
    paddingLeft: 41,
    paddingRight: 10,
    width: "100%",
    backgroundColor: constants.colors.bottomNav,
  },
  checkValue: {
    position: "absolute",
    left: 10,
    top: 13,
    color: constants.colors.chatDate,
  },
});
