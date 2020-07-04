import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import constants from '../../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TopBarWithSettingIcon({title, icon, navigation}) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity
        style={styles.icon}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Three')}>
        <MaterialCommunityIcons
          name={icon}
          color={constants.colors.msgSent}
          size={35}
        />
      </TouchableOpacity>
    </View>
  );
}

const {isIos, hasNotch, width} = constants.screen;
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingTop: isIos ? (hasNotch ? 40 : 20) : hasNotch ? 30 : 10,
    paddingBottom: 18,
    width: width - 40
  },
  headerTitle: {flex: 1, fontSize: 40, fontWeight: 'bold', color: '#ffffff'},
  icon: {marginTop: 10},
});
