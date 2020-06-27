import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import MainScreen from "../../screens/mainScreen";
import Main from "./index";

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
  tabBarIcon: ({ tintColor }) => (
    <MaterialCommunityIcons
      name={icon || "coffee"}
      color={tintColor}
      size={iconSize || 26}
    />
  ),
});

// const BottomTabNavigator = createMaterialBottomTabNavigator(
//   {
//     One: {
//       screen: Login,
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

const Tab = createBottomTabNavigator();

const BottomTabNavigator = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="MainScreen"
      tabBarOptions={{
        activeTintColor: "#ffffff",
        inactiveTintColor: "#5e666f",
        labelStyle: {
          fontSize: 11,
          // fontFamily: "NotoSansKr-Bold",
          fontWeight: "bold",
        },
        style: {
          backgroundColor: "#343a41",
          height: 80, // + getBottomSpace(),
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
        // options={{
        //   tabBarLabel: "One",
        //   // tabBarIcon: ({ color }) => (
        //   //   <Image
        //   //     source={VibesTabIcon}
        //   //     style={{
        //   //       height: 34,
        //   //       width: 34,
        //   //       tintColor: color,
        //   //     }}
        //   //   />
        //   // ),
        // }}
        options={navOption({ icon: "home" })}
      />
      <Tab.Screen
        name="Two"
        component={ScreenTwo}
        options={{
          tabBarLabel: "Two",
          // tabBarIcon: ({ color }) => (
          //   <Image
          //     source={EventsTabIcon}
          //     style={{
          //       height: 34,
          //       width: 34,
          //       tintColor: color,
          //     }}
          //   />
          // ),
        }}
      />
      {/* <Tab.Screen name="More" component={More} /> */}
      <Tab.Screen
        name="MainScreen"
        component={Main}
        options={{
          tabBarLabel: "Three",
          // tabBarIcon: ({ color }) => (
          //   <Image
          //     source={VibeUploadTabIcon}
          //     style={{
          //       height: 34,
          //       width: 34,
          //       tintColor: color,
          //     }}
          //   />
          // ),
        }}
      />
      {/* <Tab.Screen
        name="Alarms"
        component={Alarms}
        options={{
          tabBarLabel: none,
          tabBarIcon: ({ color }) => (
            <Image
              source={AlarmsTabIcon}
              style={{
                height: 34,
                width: 34,
                tintColor: color,
              }}
            />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: none,
          tabBarIcon: ({ color }) => {
            return (
              <FastImage
                source={{
                  uri: props.userPhoto.length > 0 ? props.userPhoto[0].url : "",
                }}
                style={{
                  height: 34,
                  width: 34,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: color,
                }}
              />
            );
          },
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
