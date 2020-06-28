import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import constants from "../../constants";

export default function ReceivedMessage({ message, navigation }) {
  const [showTime, setShowTime] = useState(false);
  return (
    <View style={styles.wrapper}>
      {showTime && <Text style={styles.time}>23:19</Text>}
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={0.9}
        onPress={() => setShowTime(!showTime)}
      >
        <View style={{ width: "80%" }}>
          <View style={styles.msgWrapper}>
            <Text style={styles.message}>{message}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    // flex: 1,
    paddingBottom: 10,
    width: constants.screen.width - 20,
  },
  msgWrapper: {
    alignSelf: "flex-start",
    borderRadius: 7,
    backgroundColor: constants.colors.msgReceived,
  },
  message: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    fontSize: 18,
    color: constants.colors.username,
  },
  time: {
    marginTop: 7,
    marginRight: 5,
    color: constants.colors.chatDate,
  },
});
