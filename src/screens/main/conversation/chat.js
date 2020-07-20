import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {msgListState, currentUser, userListState} from '../../../recoil/atoms';
import {particularUserMsgState} from '../../../recoil/selectors';
import socket from '../../../services/socket';

import constants from '../../../constants';
import TopBarWithUsernameAndBack from '../../../components/main/chat/topBarWithUserNameAndBack';
import MessageInput from '../../../components/main/chat/msgInput';
import ReceivedMessage from '../../../components/main/chat/receivedMsg';
import SentMessage from '../../../components/main/chat/sentMsg';
import FullScreenLoader from '../../../components/fullScreenLoader';

import API from '../../../services/apiService';

export default function Chat({navigation, route}) {
  const [msgList, setMsgList] = useRecoilState(msgListState);
  const currentMessageState = useRecoilValue(particularUserMsgState);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useRecoilState(userListState);

  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({tabBarVisible: false});

    fetchMessages();

    socket.on(
      'receive_message',
      ({username, message, senderId, receiverId, msgData}) => {
        fetchMessages();
      },
    );

    return () => {
      return parent.setOptions({tabBarVisible: true});
    };
  }, []);

  const fetchMessages = async () => {
    try {
      // console.log('here');
      const userId = route.params?.user._id;
      // console.log('here 1', userId);
      const response = await API.getMessages({receiverId: userId, page: 1});
      // console.log('here 2', response);
      if (response.status === 200) {
        if (response.data.success) {
          const {
            data: {messages, unseenMsgCount},
          } = response.data;
          const previousMessages = msgList[userId]?.messages || [];
          const uniqueArray = constants.utils.getUniqueArray([
            ...previousMessages,
            ...messages,
          ]);
          const updates = {
            ...msgList,
            [userId]: {messages: uniqueArray, unseenMsgCount},
          };
          setMsgList(updates);
          setIsLoading(false);
          messages.length &&
            seenMessages({lastMsgId: messages[0]._id, receiverId: userId});
        }
      }
    } catch (e) {
      console.log('Message fetch error - ', e);
    }
  };

  const seenMessages = async ({lastMsgId, receiverId}) => {
    try {
      // const response = await API.seenMessages({receiverId, lastMsgId});
      // console.log('here 2', response);
      // if (response.status === 200) {
      //   if (response.data.success) {
      //     const {
      //       data: {messages, unseenMsgCount},
      //     } = response.data;
      //     const previousMessages = msgList[userId]?.messages || [];
      //     const uniqueArray = constants.utils.getUniqueArray([
      //       ...previousMessages,
      //       ...messages,
      //     ]);
      //     const updates = {
      //       ...msgList,
      //       [userId]: {messages: uniqueArray, unseenMsgCount},
      //     };
      //     setMsgList(updates);

      //     seenMessages({lastMsgId: messages[0]._id, receiverId: userId});
      //   }
      // }
    } catch (e) {
      console.log('Message seen error - ', e);
    }
  };

  const sendMessage = (message) => {
    const receiverId = route.params.user._id;
    const newMessage = {
      message,
      _id: Math.random().toString(36),
      createdAt: new Date().toISOString(),
      isCurrentUserSender: true,
    };
    setMsgList({
      ...msgList,
      [receiverId]: {
        messages: [newMessage, ...msgList[receiverId].messages],
        unseenMsgCount: msgList[receiverId].unseenMsgCount,
      },
    });

    socket.emit('send_message', {receiverId, message});

    // Refresh users list
    const tempUsers = [...users];
    const index = tempUsers.findIndex((user) => user._id === receiverId);
    const user = tempUsers.splice(index, 1)[0];
    tempUsers.unshift({
      ...user,
      lastMessage: message,
      lastMessageDate: new Date().toISOString(),
    });
    setUsers([...tempUsers]);
  };

  return (
    <View style={styles.container}>
      {isLoading && <FullScreenLoader />}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <TopBarWithUsernameAndBack
            navigation={navigation}
            username={route.params?.user.username ?? 'username'}
          />
          <FlatList
            inverted
            data={currentMessageState.messages}
            renderItem={({
              index,
              item: {isCurrentUserSender, message, createdAt},
            }) =>
              isCurrentUserSender ? (
                <SentMessage message={message} time={createdAt} />
              ) : (
                <ReceivedMessage message={message} time={createdAt} />
              )
            }
            keyExtractor={(item) => item._id}
            styles={{overflow: 'none'}}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <MessageInput
              navigation={navigation}
              sendMessage={(message) => sendMessage(message)}
            />
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: constants.colors.chatBg},
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
  },
  // msgInput: {position: 'absolute', top: constants.screen.height - 80},
});
