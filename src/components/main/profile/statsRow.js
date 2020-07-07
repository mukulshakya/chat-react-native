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

const {colors} = constants;

export default function StatsRow({navigation, route}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} style={styles.option}>
        <View>
          <Text style={styles.optionText}>POSTS</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.option,
          // {
          //   borderLeftWidth: 1,
          //   borderRightWidth: 1,
          //   borderColor: constants.colors.chatDate,
          // },
        ]}>
        <View>
          <Text style={styles.optionText}>FOLLOWERS</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} style={styles.option}>
        <View>
          <Text style={styles.optionText}>FOLLOWING</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bottomNav,
    flexDirection: 'row',
    alignItems: 'center',
  },
  option: {
    flex: 1,
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderColor: colors.username,
  },
  optionText: {textAlign: 'center', color: colors.username},
});
