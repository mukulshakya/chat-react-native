import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import constants from '../constants';
import AsyncStorage from '@react-native-community/async-storage';

export default function Header({title, navigation}) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title || 'Chat App'}</Text>
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
          size={35}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: constants.deviceInfo.hasNotch() ? 80 : 55,
    backgroundColor: constants.colors.bottomNav,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    // elevation: 1,
  },
  headerTitle: {
    textAlign: 'center',
    // position: "relative",
    top: constants.deviceInfo.hasNotch() ? 45 : 23,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#F8F8F5',
  },
  icon: {
    marginTop: 15,
    position: 'relative',
    left: constants.screen.width - 50,
  },
});
