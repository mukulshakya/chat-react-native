import React, {useRef, useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {userSearchFilter} from '../../../recoil/atoms';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';

import constants from '../../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SearchBar({fromMusicSearch, cb}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [value, setValue] = useRecoilState(userSearchFilter);

  const startAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={'magnify'}
        color={constants.colors.chatDate}
        size={24}
        style={[styles.icon, {paddingLeft: 10}]}
      />
      <TextInput
        style={styles.input}
        value={value}
        placeholder="Search"
        placeholderTextColor={constants.colors.chatDate}
        onChangeText={(text) => {
          setValue(text);
          // cb(text);
          startAnimation();
          // fromMusicSearch && '';
        }}
      />
      {!!value && (
        <Animated.View style={{opacity: fadeAnim}}>
          <TouchableOpacity
            onPress={() => {
              cb(value);
              setValue('');
            }}>
            <MaterialCommunityIcons
              name={'close'}
              color={'#fff'}
              size={24}
              style={[styles.icon, {paddingRight: 10}]}
            />
          </TouchableOpacity>
        </Animated.View>
      )}
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
  icon: {marginTop: 2},
});
