import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import io from "socket.io-client";

import constants from "../../constants";
import TopBarWithUsernameAndBack from "../../components/chat/topBarWithUserNameAndBack";
import MessageInput from "../../components/chat/msgInput";
import ReceivedMessage from "../../components/chat/receivedMsg";
import SentMessage from "../../components/chat/sentMsg";

export default function Chat({ navigation }) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({ tabBarVisible: false });
    if (Platform.OS === "ios") {
      Keyboard.addListener("keyboardWillShow", onKeyboardWillShow);
      Keyboard.addListener("keyboardWillHide", onKeyboardWillHide);
    }

    const socket = io("https://chatapp3690.herokuapp.com");
    socket.on("connect", () => console.log("connection success"));

    return () => {
      if (Platform.OS === "ios") {
        Keyboard.removeListener("keyboardWillShow", onKeyboardWillShow);
        Keyboard.removeListener("keyboardWillHide", onKeyboardWillHide);
      }
      return parent.setOptions({ tabBarVisible: true });
    };
  }, []);

  const onKeyboardWillShow = (e) => {
    setKeyboardHeight(e.endCoordinates.height - 15);
  };

  const onKeyboardWillHide = () => {
    setKeyboardHeight(0);
  };

  const generateRandomMsg = () => {
    let randomNum = Math.ceil(Math.random() * 20);
    const r = Math.random().toString(36).substr(2, 5);
    let randomString = "";
    while (randomNum) {
      randomString += r;
      --randomNum;
    }
    return randomString;
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <View style={styles.topbar}>
            <TopBarWithUsernameAndBack navigation={navigation} />
          </View>

          <SafeAreaView
            style={{
              height: constants.screen.height - 200 - keyboardHeight,
            }}
          >
            <FlatList
              inverted
              data={Array(30)
                .fill()
                .map((e, i) => i)}
              renderItem={({ index }) =>
                index % 2 ? (
                  <ReceivedMessage message={generateRandomMsg()} />
                ) : (
                  <SentMessage message={generateRandomMsg()} />
                )
              }
              keyExtractor={(index) => index + ""}
              styles={{ overflow: "none" }}
            />
          </SafeAreaView>

          {/* <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          > */}
          <View style={styles.msgInput}>
            <MessageInput navigation={navigation} />
          </View>
          {/* </KeyboardAvoidingView> */}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: "100%", backgroundColor: constants.colors.chatBg },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
  },
});
