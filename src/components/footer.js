import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

const screenWidth = Math.round(Dimensions.get("window").width);

export default function Footer(props) {
  console.log({ props });
  const [selected, setSelected] = useState(0);

  const renderOption = (key) => (
    <View
      style={[styles.option, key !== 3 && { borderRightWidth: 0.2 }]}
      key={key}
    >
      <TouchableOpacity
        onPress={() => {
          setSelected(key);
          AsyncStorage.multiRemove(["token", "user"])
          // .then(() =>
          //   // props.navigation.navigate("Authentication")
          // );
        }}
      >
        <Image
          source={{
            uri: "https://i.ya-webdesign.com/images/user-avatar-png-7.png",
          }}
          style={[
            styles.tinyLogo,
            selected === key && { borderColor: "#E5AE47" },
          ]}
        />
      </TouchableOpacity>
      <Text style={{ color: "#F8F8F5" }}>Option {key + 1}</Text>
    </View>
  );

  return (
    <View style={styles.footer}>
      {Array(4)
        .fill()
        .map((e, i) => renderOption(i))}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 70,
    backgroundColor: "tomato",
    display: "flex",
    flexDirection: "row",
  },
  option: {
    height: 70,
    width: screenWidth / 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3A6E81",
  },
  tinyLogo: {
    height: 30,
    width: 30,
    borderWidth: 3,
    borderColor: "transparent",
    borderRadius: 100,
  },
});
