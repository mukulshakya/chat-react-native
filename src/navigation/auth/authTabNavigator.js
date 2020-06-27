import React from "react";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MainScreen from "../../screens/mainScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LoginScreen from "../../screens/login";
import SignUpScreen from "../../screens/signup";

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

// const navOption = ({ icon, iconSize }) => ({
//   tabBarIcon: ({ tintColor }) => (
//     <MaterialCommunityIcons
//       name={icon || "coffee"}
//       color={tintColor}
//       size={iconSize || 26}
//     />
//   ),
// });

// const BottomTabNavigator = createMaterialBottomTabNavigator(
//   {
//     One: {
//       screen: ScreenOne,
//       navigationOptions: navOption({ icon: "home" }),
//     },
//     Two: {
//       screen: ScreenTwo,
//       navigationOptions: navOption({ icon: "apple" }),
//     },
//     Three: {
//       screen: MainScreen,
//       navigationOptions: navOption({ icon: "desktop-mac" }),
//     },
//   },
//   {
//     initialRouteName: "One",
//     activeColor: "#f0edf6",
//     inactiveColor: "#3BAD87",
//     barStyle: { backgroundColor: "#3A6E81" },
//     shifting: true,
//   }
// );

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { paddingTop: 30, backgroundColor: "transparent" },
      }}
    >
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="SignUp" component={SignUpScreen} />
    </Tab.Navigator>
  );
}
