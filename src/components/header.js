import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Platform} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import constants from '../constants';
import AsyncStorage from '@react-native-community/async-storage';

export default function Header({title, navigation}) {
  return (
    <View style={styles.header}>
      <Text style={{...styles.headerTitle, fontSize: 25}}>
        {title || 'Chat App'}
      </Text>
      <TouchableOpacity
        style={styles.icon}
        activeOpacity={0.7}
        onPress={async () => {
          await AsyncStorage.multiRemove(['token', 'user']);
          navigation.navigate('Authentication');
        }}>
        <MaterialCommunityIcons
          name="logout-variant"
          color={constants.colors.username}
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
}

const {isIos, hasNotch} = constants.screen;

const styles = StyleSheet.create({
  header: {
    height: constants.deviceInfo.hasNotch() ? 80 : 55,
    backgroundColor: constants.colors.bottomNav,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    textAlign: 'center',
    top: isIos ? (hasNotch ? 20 : 10) : hasNotch ? 30 : 0,
    fontWeight: 'bold',
    color: '#F8F8F5',
    flex: 1,
  },
  icon: {
    flex: 1,
    top: isIos ? (hasNotch ? 45 : 23) : hasNotch ? 30 : 15,
    position: 'absolute',
    left: constants.screen.width - 40,
  },
});
