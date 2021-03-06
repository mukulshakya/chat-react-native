import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import constants from '../../../constants';

export default function ReceivedMessage({message, time, navigation}) {
  const [showTime, setShowTime] = useState(false);

  const convertTime = (date) => new Date(date).toTimeString().split(' ')[0];

  return (
    <View style={styles.wrapper}>
      {showTime && <Text style={styles.time}>{convertTime(time)}</Text>}
      <TouchableOpacity
        style={{flex: 1, flexDirection: 'row-reverse'}}
        activeOpacity={1}
        onPress={() => setShowTime(!showTime)}>
        <View style={styles.msgWrapperOuter}>
          <View style={styles.msgWrapper}>
            <Text style={styles.message}>{message}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row-reverse',
    flex: 1,
    paddingBottom: 10,
    width: constants.screen.width - 20,
  },
  msgWrapperOuter: {width: '80%', flexDirection: 'row-reverse'},
  msgWrapper: {
    alignSelf: 'flex-start',
    borderRadius: 7,
    backgroundColor: constants.colors.msgSent,
  },
  message: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    fontSize: 18,
    color: constants.colors.username,
  },
  time: {marginTop: 7, marginLeft: 5, color: constants.colors.chatDate},
});
