import {selector} from 'recoil';

import {userListState, userSearchFilter} from './atoms';

export const filteredUserListState = selector({
  key: 'filteredUserListState',
  get: ({get}) => {
    const search = get(userSearchFilter);
    const userList = get(userListState);

    const pattern = new RegExp(search, 'i');
    console.log({pattern});
    return search
      ? userList.filter(({username}) => pattern.test(username))
      : userList;
  },
});

// export const todoListStatsState = selector({
//   key: 'todoListStatsState',
//   get: ({get}) => {
//     const todoList = get(filteredTodoListState);
//     const totalNum = todoList.length;
//     const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
//     const totalUncompletedNum = totalNum - totalCompletedNum;
//     const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

//     return {
//       totalNum,
//       totalCompletedNum,
//       totalUncompletedNum,
//       percentCompleted,
//     };
//   },
// });
