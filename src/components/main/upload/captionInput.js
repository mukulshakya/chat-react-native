import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";

import constants from "../../../constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function MessageInput({ saveCaption }) {
  const [value, setValue] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder="Type something..."
        placeholderTextColor={constants.colors.chatDate}
        onChangeText={(text) =>
          text.length < 501 && (setValue(text), saveCaption(text))
        }
        multiline={true}
      />
      <Text style={styles.charCount}>
        (
        <Text style={[value.length !== 500 && { color: "#fff" }]}>
          {value.trim().length}
        </Text>
        /500)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", alignItems: "center" },
  input: {
    borderWidth: 0.2,
    padding: 10,
    width: "100%",
    backgroundColor: constants.colors.bottomNav,
    color: constants.colors.username,
    height: constants.screen.height / 7,
  },
  charCount: {
    position: "absolute",
    right: 2,
    top: constants.screen.height / 7 - 20,
    color: constants.colors.msgSent,
  },
});
