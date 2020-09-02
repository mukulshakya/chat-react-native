import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LoginScreen from '../../screens/auth/login';
import SignUpScreen from '../../screens/auth/signup';
import constants from '../../constants';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: constants.colors.chatDate,
        style: {
          paddingTop: constants.deviceInfo.hasNotch() ? 30 : 0,
          backgroundColor: constants.colors.bottomNav,
          color: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.46,
          shadowRadius: 11.14,
          elevation: 17,
        },
        indicatorStyle: {backgroundColor: 'white', height: 1},
      }}>
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="SignUp" component={SignUpScreen} />
    </Tab.Navigator>
  );
}
