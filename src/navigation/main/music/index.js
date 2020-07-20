import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import MusicSearch from '../../../screens/main/music/search';
import MusicPlayer from '../../../screens/main/music/player';

const viewStyle = ({backgroundColor}) => ({
  backgroundColor: backgroundColor || 'tomato',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});
const ScreenOne = () => (
  <View style={viewStyle({backgroundColor: 'tomato'})}>
    <Text>Screen One</Text>
  </View>
);
const ScreenTwo = () => (
  <View style={viewStyle({backgroundColor: 'royalblue'})}>
    <Text>Screen Two</Text>
  </View>
);
const ScreenThree = () => (
  <View style={viewStyle({backgroundColor: 'palegreen'})}>
    <Text>Screen Three</Text>
  </View>
);

const Stack = createStackNavigator();
export default function MusicStack() {
  return (
    <Stack.Navigator initialRouteName="MusicSearch" headerMode="none">
      <Stack.Screen
        options={{headerShown: false}}
        name="MusicSearch"
        component={MusicSearch}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MusicPlayer"
        component={MusicPlayer}
      />
    </Stack.Navigator>
  );
}
