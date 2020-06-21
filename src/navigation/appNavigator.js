import { createAppContainer, createSwitchNavigator } from "react-navigation";

import BottomTabNavigator from "./bottomTabNavigator";

export default createAppContainer(
  createSwitchNavigator({
    // Additional routes such as a login route could
    // be added here:
    // Login: LoginNavigator,
    Main: BottomTabNavigator,
  })
);
