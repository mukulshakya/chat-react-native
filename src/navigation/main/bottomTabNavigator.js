import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Platform} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import MainScreen from "../../screens/mainScreen";
import Home from './home';
import Upload from '../../screens/main/upload/upload';
import Music from './music';
import Conversations from './conversation';
// import Main from "./index";

import constants from '../../constants';
const {isIos, hasNotch} = constants.screen;
const navOption = ({label, icon, iconSize, visible, style}) => ({
  tabBarLabel: label,
  tabBarIcon: ({color}) => (
    <MaterialCommunityIcons
      name={icon || 'coffee'}
      color={color}
      size={iconSize || 35}
      style={{
        ...style,
        marginTop: isIos && hasNotch ? 10 : 0,
      }}
    />
  ),
});

const bottomNavStyle = {
  backgroundColor: constants.colors.bottomNav,
  padding: 5,
  paddingBottom: 0,
  height: constants.screen.bottomNavHeight(),
  borderTopWidth: 0,
  shadowColor: '#000',
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
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: constants.colors.username,
        inactiveTintColor: constants.colors.chatDate,
        showLabel: false,
        labelStyle: {fontSize: 11, fontWeight: 'bold'},
        style: bottomNavStyle,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{...navOption({icon: 'home-outline'}), tabBarVisible: true}}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          ...navOption({icon: 'plus-box-outline'}),
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="Conversations"
        component={Conversations}
        options={navOption({icon: 'message-text-outline'})}
      />
      <Tab.Screen
        name="Music"
        component={Music}
        options={navOption({
          icon: 'music-box-outline',
          style: {marginBottom: 5},
        })}
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
