import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";

import constants from "../../constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function MessageInput() {
  const [value, setValue] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder="Type something..."
        placeholderTextColor={constants.colors.chatDate}
        onChangeText={(text) => setValue(text)}
        multiline={true}
      />
      <TouchableOpacity
        disabled={!value}
        style={styles.icon}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons
          name={"send-circle"}
          color={value ? constants.colors.msgSent : constants.colors.chatDate}
          size={35}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: constants.screen.width - 20,
    alignItems: "center",
    paddingVertical: 18,
  },
  input: {
    borderWidth: 0.2,
    borderRadius: 8,
    paddingRight: 45,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    width: "100%",
    backgroundColor: constants.colors.bottomNav,
    color: constants.colors.username,
    maxHeight: 100,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 24,
    color: constants.colors.msgSent,
  },
});
