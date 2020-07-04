import React, {useState} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';

import constants from '../../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {
  screen: {isIos, hasNotch},
  colors: {msgSent, chatDate, username, bottomNav},
} = constants;

export default function MessageInput() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, isIos && styles.inputIos]}
        value={value}
        placeholder="Type something..."
        placeholderTextColor={chatDate}
        onChangeText={(text) => setValue(text)}
        multiline={true}
      />
      <TouchableOpacity
        disabled={!value}
        style={[styles.icon, isIos && styles.iconIos]}
        activeOpacity={0.7}>
        <MaterialCommunityIcons
          name={'send-circle'}
          color={value ? msgSent : chatDate}
          size={35}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: constants.screen.width - 20,
    marginTop: 10,
    marginBottom: isIos && hasNotch ? 15 : 10,
    flexDirection: 'row',
    backgroundColor: bottomNav,
    borderWidth: 0.2,
    borderRadius: 7,
  },
  input: {paddingHorizontal: 10, width: '90%', color: username, maxHeight: 100},
  inputIos: {marginTop: 5, marginBottom: 10},
  icon: {right: 8, color: msgSent},
  iconIos: {top: 1, right: hasNotch ? 0 : 5},
});
