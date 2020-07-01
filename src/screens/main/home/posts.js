import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useRecoilState} from 'recoil';
import {postListState} from '../../../recoil/atoms';

import API from '../../../services/apiService';
import constants from '../../../constants';
import Header from '../../../components/header';
import Post from '../../../components/main/home/post';
import FullScreenLoader from '../../../components/fullScreenLoader';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default function Posts({navigation, route}) {
  const [posts, setPosts] = useRecoilState(postListState);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useState({userId: '', offset: 0, limit: 8});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (params) => {
    try {
      const filters = params || {};
      const response = await API.getPosts(filters);
      if (response.status === 200) {
        const {data, success} = response.data;
        if (success) {
          !params
            ? (setPosts(data.posts),
              setParams({userId: '', offset: 0, limit: 8}))
            : setPosts((oldPosts) =>
                [
                  ...new Set(
                    [...oldPosts, ...data.posts].map((i) => JSON.stringify(i)),
                  ),
                ].map((i) => JSON.parse(i)),
              );
          setTotalPosts(data.totalPosts);
        }
        setIsLoading(false);
      }
    } catch (e) {
      console.log('Get posts error - ', e);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <FullScreenLoader />}
      <Header navigation={navigation} />
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            params.offset += 8;
            setParams({...params});
            params.offset < totalPosts && fetchPosts(params);
          }
        }}
        scrollEventThrottle={400}>
        {posts.map((post, index) => (
          <Post navigation={navigation} data={post} key={post._id} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: constants.colors.chatBg, flex: 1},
  innerContainer: {},
});
