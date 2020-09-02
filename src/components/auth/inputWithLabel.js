import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View, TextInput, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import constants from '../../constants';

export default function InputWithLabel({
  label,
  passValue,
  validFields,
  clear,
  field,
}) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    validFields &&
      typeof validFields[field] === 'boolean' &&
      setIsValid(validFields[field]);
    clear && setValue('');
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, value && !isValid && {borderColor: 'red'}]}
        value={value}
        placeholder={'Enter ' + label}
        placeholderTextColor={constants.colors.chatDate}
        onChangeText={(text) => {
          setValue(text);
          passValue(text);
        }}
      />

      <Text style={styles.checkValue}>
        {value && (
          <MaterialCommunityIcons
            name={isValid ? 'check' : 'close'}
            color={isValid ? 'green' : 'red'}
            size={20}
          />
        )}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    display: 'flex',
    // height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 5,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 20,
    //   height: 20,
    // },
    // shadowOpacity: 0.46,
    // shadowRadius: 50,
    // elevation: 17,
    // backgroundColor: 'red',
  },
  label: {
    flex: 1.8,
    // width: 50,
    // height: 50,
    color: constants.colors.username,
  },
  input: {
    flex: 5,
    height: 40,
    // borderColor: constants.colors.chatDate,
    borderWidth: 0.2,
    borderRadius: 7,
    backgroundColor: constants.colors.bottomNav,
    color: 'white',
    paddingLeft: 10,
    paddingRight: 30,
  },
  checkValue: {position: 'absolute', right: '3.5%'},
});
