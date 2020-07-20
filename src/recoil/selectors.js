import {selector} from 'recoil';

import {
  userListState,
  userSearchFilter,
  msgListState,
  particularUserIdState,
} from './atoms';

export const filteredUserListState = selector({
  key: 'filteredUserListState',
  get: ({get}) => {
    const search = get(userSearchFilter);
    const userList = get(userListState);

    const pattern = new RegExp(search, 'i');
    return search
      ? userList.filter(({username}) => pattern.test(username))
      : userList;
  },
});

export const particularUserMsgState = selector({
  key: 'particularUserMsgState',
  get: ({get}) => {
    const msgList = get(msgListState);
    const particularUserId = get(particularUserIdState);
    // console.log({particularUserId});
    // console.log({msglist: msgList[particularUserId]});

    return msgList[particularUserId] || {messages: [], unseenMsgCount: 0};
  },
});
