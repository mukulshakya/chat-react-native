import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import constants from '../constants';
import {Platform} from 'react-native';

const api = axios.create({baseURL: constants.apiUrl.live});

api.interceptors.request.use(
  async function (config) {
    const token = await AsyncStorage.getItem('token');
    if (token) return {...config, headers: {Authorization: token}};
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// const token = "";
// AsyncStorage.getItem("token").then((token) => (token = token));
// const api = axios.create({
//   baseURL: constants.apiUrl.local,
//   headers: { Authorization: token },
// });

const func = {};

func.register = async (payload) => {
  try {
    // console.log({ payload });
    const res = await api.post('/register', payload);
    console.log({res});
    return res;
  } catch (error) {
    return error;
  }
};

func.login = async (payload) => {
  try {
    console.log({payload});
    const res = await api.post('/login', payload);
    console.log({res});
    return res;
  } catch (error) {
    console.log(JSON.stringify(error));
    return error;
  }
};

func.profile = async () => {
  try {
    const res = await api.get('/profile');
    return res;
  } catch (error) {
    return error;
  }
};

func.getUsers = async () => {
  try {
    const res = await api.get('/users');
    return res;
  } catch (error) {
    return error;
  }
};

func.getPosts = async (params) => {
  try {
    const res = await api.get('/posts', {params});
    return res;
  } catch (error) {
    return error;
  }
};

func.uploadPost = async (payload) => {
  try {
    const res = await api.post('/posts', payload);
    return res;
  } catch (error) {
    return error;
  }
};

func.uploadImage = async ({uri, type, name}) => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri,
      type: 'image/jpeg',
      name: name || Math.random().toString(36).split('.')[1] + '.jpg',
    });

    const res = await axios({
      method: 'POST',
      url: 'https://api.imgur.com/3/upload',
      headers: {
        Authorization: 'Client-ID ' + constants.imgur.clientId,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: formData,
    });
    return res;
  } catch (error) {
    console.log({error});
    return error;
  }
};

func.searchSong = async (keyword) => {
  try {
    const search = String(keyword).trim().replace(/ +/g, '+');
    const res = await axios.get('https://jiosaavn.ga/api/?query=' + search);
    return res;
  } catch (error) {
    console.log({error});
    return error;
  }
};

func.getSongDetail = async (url) => {
  try {
    const res = await axios.get(
      'https://jiosaavn.netlify.app/api/?query=' + url,
    );
    return res;
  } catch (error) {
    console.log({error});
    return error;
  }
};

func.postMessage = async ({receiverId, message}) => {
  try {
    const res = await api.post('/messages/' + receiverId, {message});
    return res;
  } catch (error) {
    return error;
  }
};

func.getMessages = async ({receiverId, page}) => {
  try {
    const res = await api.get(`/messages/${receiverId}?page=${page || 1}`);
    return res;
  } catch (error) {
    return error;
  }
};

func.seenMessages = async ({receiverId, lastMsgId}) => {
  try {
    const res = await api.patch(`/messages/${receiverId}`, {
      seenUntilMsgId: lastMsgId,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export default func;
