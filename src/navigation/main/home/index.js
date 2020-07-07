import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Posts from "../../../screens/main/home/posts";
import Profile from "../../../screens/main/profile";
import Chat from "../../../screens/main/conversation/chat";

const viewStyle = ({ backgroundColor }) => ({
  backgroundColor: backgroundColor || "tomato",
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
});
const ScreenOne = () => (
  <View style={viewStyle({ backgroundColor: "tomato" })}>
    <Text>Screen One</Text>
  </View>
);
const ScreenTwo = () => (
  <View style={viewStyle({ backgroundColor: "royalblue" })}>
    <Text>Screen Two</Text>
  </View>
);
const ScreenThree = () => (
  <View style={viewStyle({ backgroundColor: "palegreen" })}>
    <Text>Screen Three</Text>
  </View>
);

const Stack = createStackNavigator();
export default function ConversationStack() {
  return (
    <Stack.Navigator initialRouteName="Posts" headerMode="none">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Posts"
        component={Posts}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={Profile}
      />
    </Stack.Navigator>
  );
}
