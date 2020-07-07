import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, ScrollView, Image, Text} from 'react-native';
import {useRecoilState} from 'recoil';
import constants from '../../../constants';

export default function Posts({navigation, route}) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://i.ya-webdesign.com/images/user-avatar-png-7.png',
        }}
        style={styles.userImg}
      />
      <View style={styles.stats}>
        <View>
          <Text style={styles.text}>0</Text>
          <Text style={styles.text}>Posts</Text>
        </View>
        <View>
          <Text style={styles.text}>0</Text>
          <Text style={styles.text}>Followers</Text>
        </View>
        <View>
          <Text style={styles.text}>0</Text>
          <Text style={styles.text}>Following</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: constants.colors.chatBg,
    width: constants.screen.width - 40,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  userImg: {height: 100, width: 100},
  stats: {flexDirection: 'row', justifyContent: 'space-around', flex: 1},
  text: {color: '#fff', textAlign: 'center'},
});
