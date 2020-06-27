import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../../screens/mainScreen";

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

const Stack = createStackNavigator();
export default function Main() {
  return (
    <Stack.Navigator initialRouteName="MainScreen" headerMode="none">
      <Stack.Screen
        options={{ headerShown: false }}
        name="One"
        component={ScreenOne}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Two"
        component={ScreenTwo}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="MainScreen"
        component={MainScreen}
      />
    </Stack.Navigator>
  );
}
