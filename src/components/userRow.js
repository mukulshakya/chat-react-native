import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function UserRow({ count, showUserDetailsModal }) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => showUserDetailsModal({ count })}
      >
        <Image
          source={{
            uri: "https://i.ya-webdesign.com/images/user-avatar-png-7.png",
          }}
          style={styles.tinyLogo}
        />
      </TouchableOpacity>
      <Text style={styles.username}>username {count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { display: "flex", flexDirection: "row" },
  tinyLogo: { height: 50, width: 50 },
  username: { flex: 5, lineHeight: 50, fontSize: 20, marginLeft: 10 },
});
