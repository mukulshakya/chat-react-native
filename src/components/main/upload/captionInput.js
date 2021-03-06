import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

import constants from '../../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MessageInput({saveCaption, isClear}) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue('');
  }, [isClear]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder="Type something..."
        placeholderTextColor={constants.colors.chatDate}
        onChangeText={(text) =>
          text.length < 501 && (setValue(text), saveCaption(text))
        }
        multiline={true}
      />
      <Text style={styles.charCount}>
        (
        <Text style={[value.length !== 500 && {color: '#fff'}]}>
          {value.trim().length}
        </Text>
        /500)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 10, backgroundColor: constants.colors.bottomNav},
  input: {
    borderWidth: 0.2,
    color: constants.colors.username,
    height: constants.screen.height / 7,
  },
  charCount: {
    position: 'absolute',
    right: 2,
    top: constants.screen.height / 7,
    color: constants.colors.msgSent,
  },
});
