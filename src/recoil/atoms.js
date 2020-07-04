import {atom} from 'recoil';

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

export const currentUser = atom({
  key: 'currentUser',
  default: null,
});
