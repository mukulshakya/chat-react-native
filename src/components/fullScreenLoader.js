import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

export default function FullScreenLoader({ navigation, route }) {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingView: {
    position: "absolute",
    zIndex: 99,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
});
