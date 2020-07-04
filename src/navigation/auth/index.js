import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../screens/auth/login";

const Stack = createStackNavigator();
export default function Authentication() {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={RegisterScreen}
      /> */}
    </Stack.Navigator>
  );
}
