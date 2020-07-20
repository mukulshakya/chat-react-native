import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import constants from '../../../constants';
import {useRecoilState} from 'recoil';
import {particularUserIdState} from '../../../recoil/atoms.js';

export default function UserRow({user, navigation, fetchUsers}) {
  const [userId, setUserId] = useRecoilState(particularUserIdState);
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
        onPress={() => {
          setUserId(user._id);
          navigation.navigate('Chat', {user});
        }}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.lastMsg}>{user.lastMessage || ''}</Text>
      </TouchableOpacity>
      {user.unseenMsgCount && (
        <View style={styles.unseenMsgCountWrapper}>
          <Text style={styles.unseenMsgCount}>{user.unseenMsgCount}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingBottom: 18,
    width: constants.screen.width,
    paddingHorizontal: 20,
    alignItems: 'center',
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
  unseenMsgCountWrapper: {
    backgroundColor: constants.colors.msgSent,
    borderRadius: 2000,
    height: 20,
    width: 20,
  },
  unseenMsgCount: {
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 10,
    fontWeight: 'bold',
    color: constants.colors.username,
  },
});
