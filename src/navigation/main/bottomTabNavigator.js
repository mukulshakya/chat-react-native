import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Platform } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// import MainScreen from "../../screens/mainScreen";
import Conversations from "./conversation";
import Posts from "../../screens/main/home/posts";
import Upload from "../../screens/main/upload/upload";
// import Main from "./index";

import constants from "../../constants";

const navOption = ({ label, icon, iconSize }) => ({
  tabBarLabel: label,
  tabBarIcon: ({ color }) => (
    <MaterialCommunityIcons
      name={icon || "coffee"}
      color={color}
      size={iconSize || 35}
      style={{
        marginTop:
          Platform.OS === "ios" && constants.deviceInfo.hasNotch() ? 10 : 0,
      }}
    />
  ),
});

const bottomNavStyle = {
  backgroundColor: constants.colors.bottomNav,
  padding: 5,
  height: constants.screen.bottomNavHeight(),
  borderTopWidth: 0,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 8,
  },
  shadowOpacity: 0.46,
  shadowRadius: 11.14,
  elevation: 17,
};

const Tab = createBottomTabNavigator();

const BottomTabNavigator = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="Conversations"
      tabBarOptions={{
        activeTintColor: constants.colors.username,
        inactiveTintColor: constants.colors.chatDate,
        showLabel: false,
        labelStyle: { fontSize: 11, fontWeight: "bold" },
        style: bottomNavStyle,
      }}
    >
      <Tab.Screen
        name="Posts"
        component={Posts}
        options={navOption({ icon: "home-outline" })}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={navOption({ icon: "plus-box-outline" })}
      />
      <Tab.Screen
        name="Conversations"
        component={Conversations}
        options={navOption({ icon: "message-text-outline" })}
      />
      {/* <Tab.Screen
        name="MainScreen"
        component={Main}
        options={navOption({ icon: "menu" })}
      /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
