import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import constants from "../../constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function TopBarWithSettingIcon({ title, icon, navigation }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity
        style={styles.icon}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Chat")}
      >
        <MaterialCommunityIcons
          name={icon}
          color={constants.colors.msgSent}
          size={35}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", paddingTop: 50, paddingBottom: 18 },
  headerTitle: { flex: 1, fontSize: 40, fontWeight: "bold", color: "#ffffff" },
  icon: { marginTop: 10 },
});
