import React, {forwardRef, useRef, useImperativeHandle, useState} from 'react';
import {StyleSheet, Text, Animated} from 'react-native';
import constants from '../constants';

export default forwardRef((props, ref) => {
  const [message, setMessage] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useImperativeHandle(ref, () => ({
    show(msg) {
      setMessage(msg);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() =>
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }).start(),
      );
    },
  }));

  return (
    <Animated.View style={{...styles.container, opacity: fadeAnim}}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    padding: 10,
    bottom: 100,
    backgroundColor: constants.colors.bottomNav,
    borderRadius: 5,
  },
  text: {color: constants.colors.chatDate},
});
