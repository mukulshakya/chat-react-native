import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {userListState, currentUser} from '../../../recoil/atoms';
import {filteredUserListState} from '../../../recoil/selectors';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import socket from '../../../services/socket';

import UserRow from '../../../components/main/conversation/userRow';
import TopBarWithSettingIcon from '../../../components/main/conversation/topBarWithSettingIcon';
import SearchBar from '../../../components/main/conversation/searchBar';
import FullScreenLoader from '../../../components/fullScreenLoader';
import constants from '../../../constants';
import API from '../../../services/apiService';

export default function Conversations({navigation}) {
  const [users, setUsers] = useRecoilState(userListState);
  const filteredUsers = useRecoilValue(filteredUserListState);
  const currentLoggedUser = useRecoilValue(currentUser);

  useEffect(() => {
    fetchUsers();
    socket.emit('join', {senderId: currentLoggedUser._id});

    socket.on('online', (data) => {
      console.log({data});
    });

    socket.on('receive_message', () => {
      fetchUsers();
    });
  }, []);

  const fetchUsers = async () => {
    const response = await API.getUsers();
    if (response.status === 200) {
      const {data, success} = response.data;
      success && setUsers([...data]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {!users.length && <FullScreenLoader />}
        <TopBarWithSettingIcon
          title="Chat"
          icon="tune"
          navigation={navigation}
        />
        <SearchBar navigation={navigation} />
        <FlatList
          data={filteredUsers}
          renderItem={({item, index}) => (
            // console.log({ item }),
            <UserRow
              navigation={navigation}
              user={item}
              fetchUsers={fetchUsers}
            />
          )}
          keyExtractor={(item) => item._id}
          styles={{overflow: 'none'}}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.colors.chatBg,
    alignItems: 'center',
  },
});
