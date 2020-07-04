import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import constants from '../../../constants';

export default function UserRow({user, navigation}) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.7}
        // onPress={() => showUserDetailsModal({ count })}
      >
        <Image
          source={{
            uri: 'https://i.ya-webdesign.com/images/user-avatar-png-7.png',
          }}
          style={styles.tinyLogo}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{flex: 1}}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Chat', {username: user.username})}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.lastMsg}>username</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingBottom: 18,
    width: constants.screen.width,
    paddingLeft: 20
  },
  tinyLogo: {height: 55, width: 55},
  username: {
    flex: 5,
    paddingTop: 4,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    color: constants.colors.username,
  },
  lastMsg: {
    flex: 5,
    fontSize: 15,
    marginLeft: 15,
    color: constants.colors.chatDate,
  },
});
