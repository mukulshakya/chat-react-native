import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  AsyncStorage,
} from "react-native";

import constants from "../../../constants";
import Header from "../../../components/header";
import Post from "../../../components/main/home/post";

export default function Posts({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Header />
      <SafeAreaView style={{ height: constants.screen.postFlatlistHeight() }}>
        <FlatList
          data={Array(4).fill("")}
          renderItem={({ index }) => <Post navigation={navigation} />}
          keyExtractor={(item) => constants.screen.randomString()}
          styles={{ overflow: "none" }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: constants.colors.chatBg, flex: 1 },
  innerContainer: {},
});
