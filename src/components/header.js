import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function TopBar({title}) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title || "Chat App"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { height: 80, backgroundColor: "#3A6E81" },
  headerTitle: {
    position: "relative",
    top: 45,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#F8F8F5"
  },
});
