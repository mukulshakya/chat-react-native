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

const {height, width} = constants.screen;

export default function Tile({navigation, route, image}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} style={styles.option}>
        <Image
          source={{
            uri: image || constants.dummy.images.post,
          }}
          style={styles.tinyLogo}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  tinyLogo: {width: width / 2 - 30, height: width / 2 - 30},
});
