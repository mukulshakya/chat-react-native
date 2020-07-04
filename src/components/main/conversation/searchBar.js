import React from 'react';
import {useRecoilState} from 'recoil';
import {userSearchFilter} from '../../../recoil/atoms';
import {StyleSheet, View, TextInput} from 'react-native';

import constants from '../../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SearchBar() {
  const [value, setValue] = useRecoilState(userSearchFilter);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={'magnify'}
        color={constants.colors.chatDate}
        size={24}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        value={value}
        placeholder="Search"
        placeholderTextColor={constants.colors.chatDate}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 18,
    width: constants.screen.width - 40,
    flexDirection: 'row',
    backgroundColor: constants.colors.bottomNav,
    borderWidth: 0.2,
    borderRadius: 6,
    justifyContent: 'center',
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 13,
    flex: 1,
  },
  icon: {paddingLeft: 10, marginTop: 2},
});
