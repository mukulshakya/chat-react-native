import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import MainScreen from "../../screens/mainScreen";
import Conversations from "../conversation";
import Main from "./index";

import constants from "../../constants";

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

const navOption = ({ label, icon, iconSize }) => ({
  tabBarLabel: label,
  tabBarIcon: ({ color }) => (
    <MaterialCommunityIcons
      name={icon || "coffee"}
      color={color}
      size={iconSize || 35}
      style={{ marginTop: 10 }}
    />
  ),
});

const Tab = createBottomTabNavigator();

const BottomTabNavigator = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="Conversations"
      tabBarOptions={{
        activeTintColor: constants.colors.username,
        inactiveTintColor: constants.colors.chatDate,
        showLabel: false,
        labelStyle: {
          fontSize: 11,
          fontWeight: "bold",
        },
        style: {
          backgroundColor: constants.colors.bottomNav,
          padding: 5,
          height: 80,
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.46,
          shadowRadius: 11.14,
          elevation: 17,
        },
      }}
    >
      <Tab.Screen
        name="One"
        component={ScreenOne}
        options={navOption({ icon: "home-outline" })}
      />
      <Tab.Screen
        name="Two"
        component={ScreenTwo}
        options={navOption({ icon: "calendar-blank-outline" })}
      />
      <Tab.Screen
        name="Conversations"
        component={Conversations}
        options={navOption({ icon: "message-text-outline" })}
      />
      <Tab.Screen
        name="MainScreen"
        component={Main}
        options={navOption({ icon: "menu" })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
