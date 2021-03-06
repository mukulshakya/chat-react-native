import React from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";

import Header from "../components/header";
import Content from "../components/content";
import Footer from "../components/footer";

export default function MainScreen({ navigation }) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Three")}>
        <Header />
      </TouchableOpacity>
      <Content />
      {/* <Footer /> */}
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 50,
//   },
//   tinyLogo: {
//     width: 50,
//     height: 50,
//   },
//   logo: {
//     width: 66,
//     height: 58,
//   },
// });
