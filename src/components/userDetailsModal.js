import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

export default function UserDetails({
  image,
  username,
  viewHeight,
  closeModal,
  animate,
}) {
  return (
    <Animated.View style={{ ...styles.wrapper, height: viewHeight, opacity: animate }}>
      <View style={styles.modalWrapper}>
        <TouchableOpacity activeOpacity={0.7}>
          <Image source={{ uri: image }} style={styles.tinyLogo} />
        </TouchableOpacity>
        <Text>{username}</Text>
        <TouchableOpacity
          onPress={() => closeModal()}
          style={{ position: "absolute", top: 10, right: 20 }}
        >
          <Text
            style={{
              textAlign: "right",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            x
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tinyLogo: { height: 50, width: 50 },
  username: { flex: 5, lineHeight: 50, fontSize: 20, marginLeft: 10 },
  modalWrapper: {
    padding: 50,
    // height: 300,
    backgroundColor: "rgb(230, 228, 228)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
  },
});
