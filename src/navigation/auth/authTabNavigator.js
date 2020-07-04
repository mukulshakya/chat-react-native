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
        style: {
          paddingTop: constants.deviceInfo.hasNotch() ? 30 : 0,
          backgroundColor: 'transparent',
        },
      }}>
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="SignUp" component={SignUpScreen} />
    </Tab.Navigator>
  );
}
