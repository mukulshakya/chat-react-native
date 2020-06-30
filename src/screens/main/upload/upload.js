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
import TopBarWithUsernameAndBack from "../../../components/main/chat/topBarWithUserNameAndBack";

export default function Posts({ navigation, route }) {
  return (
    <View style={styles.container}>
      <TopBarWithUsernameAndBack navigation={navigation} username="upload" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: constants.colors.chatBg, flex: 1 },
  innerContainer: {},
});
