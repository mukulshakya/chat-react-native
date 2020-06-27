import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./main/bottomTabNavigator";
import AuthNavigator from "./auth/authTabNavigator";
import Splash from "../screens/splash";

// const AppStack = createStackNavigator({ BottomTabNavigator });
// // const AuthStack = createStackNavigator({ Signin: SignScreen });

// export default createAppContainer(
//   createSwitchNavigator({
//     // Additional routes such as a login route could
//     // be added here:
//     // Login: LoginNavigator,
//     Main: AppStack,
//   })
// );

const Stack = createStackNavigator();
function Root() {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        options={{
          gestureEnabled: false,
          header: () => {
            return null;
          },
        }}
        name="Splash"
        component={Splash}
      />
      <Stack.Screen
        options={{
          gestureEnabled: false,
          header: () => {
            return null;
          },
        }}
        name="Authentication"
        component={AuthNavigator}
      />
      <Stack.Screen
        options={{
          gestureEnabled: false,
          header: () => {
            return null;
          },
        }}
        name="Home"
        component={BottomTabNavigator}
      />
    </Stack.Navigator>
  );
}

export default AppContainer = () => {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
};
