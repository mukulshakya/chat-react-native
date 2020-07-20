import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useRecoilState} from 'recoil';
import {currentUser} from '../recoil/atoms';

import API from '../services/apiService';

export default function Splash(props) {
  const [user, setUser] = useRecoilState(currentUser);
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await API.profile();
        if (response.status === 200) {
          const {success, data} = response.data;
          if (success) {
            setUser(data);
            await AsyncStorage.setItem('user', JSON.stringify(data));
            props.navigation.navigate('Home');
          } else {
            props.navigation.navigate('Authentication');
          }
        } else {
          props.navigation.navigate('Authentication');
        }
      } else {
        props.navigation.navigate('Authentication');
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CHAT APP</Text>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {color: '#ffffff', fontSize: 30, fontWeight: 'bold'},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#555555',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  horizontal: {
    padding: 10,
  },
});
