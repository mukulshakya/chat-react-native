import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useRecoilState} from 'recoil';
import constants from '../../../constants';
import FullScreenLoader from '../../fullScreenLoader';

const {height, width} = constants.screen;

export default function Tile({
  navigation,
  route,
  song,
  trackArtwork,
  isLoading,
  fromPlayer
}) {
  return (
    <View style={styles.container}>
      <View style={styles.touchableWrapper}>
        {isLoading && <FullScreenLoader />}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.option}
          onPress={() => navigation.navigate('MusicPlayer', {song})}>
          <Image
            source={{
              uri: trackArtwork || song?.artwork || constants.dummy.images.post,
            }}
            style={{
              width: width / (fromPlayer ? 1.5 : 2) - 30,
              height: width / (fromPlayer ? 1.5 : 2) - 30,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  touchableWrapper: {paddingHorizontal: 10, alignItems: 'center'},
  option: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
});
