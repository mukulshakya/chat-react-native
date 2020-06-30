import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import constants from "../../../constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function TopBarWithUsernameAndBack({ navigation, username }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={[styles.icon, { transform: [{ rotate: "-45deg" }] }]}
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons
          name="arrow-top-left"
          color={constants.colors.msgSent}
          size={35}
        />
      </TouchableOpacity>
      <Text style={styles.username}>{username}</Text>
      <TouchableOpacity
        style={styles.icon}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Three")}
      >
        <MaterialCommunityIcons
          name="dots-vertical"
          color={constants.colors.msgSent}
          size={35}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingTop: constants.deviceInfo.hasNotch() ? 45 : 15,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  icon: { marginTop: 10 },
  username: { fontSize: 20, lineHeight: 60, color: constants.colors.username },
});
