import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useRecoilState} from 'recoil';
import {currentUser} from '../../recoil/atoms';

import InputWithLabel from '../../components/auth/inputWithLabel';
import API from '../../services/apiService';
import constants from '../../constants';
import Toast from '../../components/toast';

export default function Login(props) {
  const [user, setUser] = useRecoilState(currentUser);
  const [payload, setPayload] = useState({
    email: '',
    password: '',
  });
  const [validFields, setValidFields] = useState({
    email: null,
    password: null,
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [isAllValid, setIsAllValid] = useState(false);

  const toastRef = useRef();

  const saveValue = (value, field) => {
    payload[field] = value;
    setPayload(payload);
    const {email, password} = payload;
    if (field === 'email') {
      const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
      validFields.email = pattern.test(email);
    } else if (field === 'password') {
      const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
      validFields.password = pattern.test(password);
    }
    setValidFields(validFields);
    setIsAllValid(Object.values(validFields).every((field) => field));
  };

  const submitForm = async () => {
    try {
      Keyboard.dismiss();
      const response = await API.login(payload);
      if (response.status === 200) {
        const {message, success, data} = response.data;
        setIsSubmit(true);
        setIsSubmit(false);
        toastRef.current.show(message);
        setIsAllValid(false);
        const emptyPayload = {};
        Object.keys(payload).forEach((key) => (emptyPayload[key] = null));
        setPayload(emptyPayload);
        setValidFields(emptyPayload);
        if (success) {
          await AsyncStorage.setItem('token', data.token);
          await AsyncStorage.setItem('user', JSON.stringify(data.user));
          setUser(data.user);
          props.navigation.navigate('Home');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const labels = ['Email', 'Password'];
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {Object.keys(payload).map((key, index) => {
          return (
            <InputWithLabel
              key={key}
              label={labels[index]}
              passValue={(value) => saveValue(value, key)}
              payload={payload}
              clear={isSubmit}
              validFields={validFields}
              field={key}
            />
          );
        })}
        <TouchableOpacity
          disabled={!isAllValid}
          style={[styles.button, !isAllValid && {backgroundColor: 'grey'}]}
          onPress={() => submitForm()}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <Toast ref={toastRef} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: 'center',
    flex: 1,
    backgroundColor: constants.colors.chatBg,
  },
  button: {
    backgroundColor: 'royalblue',
    color: 'white',
    width: '50%',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  btnText: {color: 'white', textAlign: 'center', fontWeight: 'bold'},
});
