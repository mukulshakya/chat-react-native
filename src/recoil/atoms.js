import {atom} from 'recoil';
import constants from '../constants';

export const userListState = atom({
  key: 'userListState',
  default: [],
});

export const postListState = atom({
  key: 'postListState',
  default: [],
});

export const userSearchFilter = atom({
  key: 'userSearchFilter',
  default: '',
});

export const msgListState = atom({
  key: 'msgListState',
  default: {},
});

export const particularUserIdState = atom({
  key: 'particularUserIdState',
  default: null,
});

export const currentUser = atom({
  key: 'currentUser',
  default: null,
});

export const songListState = atom({
  key: 'songListState',
  default: constants.dummy.trackPlayerTracks,
});

export const currentSongState = atom({
  key: 'currentSongState',
  default: {bufferedPosition: 0, duration: 0, position: 0},
});

export const socketInstance = atom({
  key: 'socketInstance',
  default: null,
});
