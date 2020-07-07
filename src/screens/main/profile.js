import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import {useRecoilState} from 'recoil';
import {TabView, SceneMap} from 'react-native-tab-view';

import TopBarWithUsernameAndBack from '../../components/main/chat/topBarWithUserNameAndBack';

// import {postListState} from '../../../recoil/atoms';

// import API from '../../../services/apiService';
import constants from '../../constants';
import UserDetails from '../../components/main/profile/userDetails';
import StatsRow from '../../components/main/profile/statsRow';
import {SafeAreaView} from 'react-native-safe-area-context';
// import Post from '../../../components/main/home/post';
// import FullScreenLoader from '../../../components/fullScreenLoader';

// const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
//   const paddingToBottom = 20;
//   return (
//     layoutMeasurement.height + contentOffset.y >=
//     contentSize.height - paddingToBottom
//   );
// };
const colors = [
  'tomato',
  'magenta',
  'orange',
  'skyblue',
  'palegreen',
  'goldenrod',
  'royalblue',
  'brown',
  'grey',
  'yellow',
];

const SecondRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#673ab7'}]}>
    <UserDetails />
  </View>
);

export default function Profile({navigation, route}) {
  //   const [posts, setPosts] = useRecoilState(postListState);
  //   const [totalPosts, setTotalPosts] = useState(0);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [params, setParams] = useState({userId: '', offset: 0, limit: 8});

  const [index, setIndex] = useState(0);
  const [userDetailsHeight, setUserDetailsHeight] = useState(0);
  const [isUserDetailsScrolled, setIsUserDetailsScrolled] = useState(false);
  const [routes] = useState([
    {key: 'first', title: 'Posts'},
    {key: 'second', title: 'Followers'},
    {key: 'third', title: 'Following'},
  ]);

  const FirstRoute = () => (
    <ScrollView
    // onScroll={({
    //   nativeEvent: {
    //     contentOffset: {y},
    //   },
    // }) => y < 10 && setIsUserDetailsScrolled(false)}
    // scrollEventThrottle={400}
    >
      <View style={[styles.scene, {backgroundColor: '#ff4081'}]}>
        {Array(10)
          .fill('')
          .map((id, index) => (
            <View
              style={{height: 300, backgroundColor: colors[index]}}
              key={index}></View>
          ))}
      </View>
    </ScrollView>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: FirstRoute,
  });

  // useEffect(() => {
  //   // fetchPosts();
  // }, []);

  //   const fetchPosts = async (params) => {
  //     try {
  //       const filters = params || {};
  //       const response = await API.getPosts(filters);
  //       if (response.status === 200) {
  //         const {data, success} = response.data;
  //         if (success) {
  //         }
  //       }
  //     } catch (e) {
  //       console.log('Get posts error - ', e);
  //     }
  //   };

  return (
    <View style={styles.container}>
      <TopBarWithUsernameAndBack
        navigation={navigation}
        username={route.params?.username ?? 'username'}
      />
      <ScrollView
      // onScroll={({
      //   nativeEvent: {
      //     contentOffset: {y},
      //   },
      // }) => y >= userDetailsHeight - 10 && setIsUserDetailsScrolled(true)}
      // scrollEventThrottle={400}
      >
        {/* <View
        // onLayout={({
        //   nativeEvent: {
        //     layout: {height},
        //   },
        // }) => setUserDetailsHeight(height)}
        > */}
        <UserDetails />
        {/* </View> */}
        <StatsRow />
        {/* <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: constants.screen.width}}
          // lazy={true}
        /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: constants.colors.chatBg, flex: 1},
  // userImg: {height: 100, width: 100},
  // innerContainer: {},
  // scene: {height: 3000},
  // one: {height: 300, backgroundColor: 'tomato'},
  // two: {height: 100, backgroundColor: 'skyblue'},
  // three: {height: 1000, backgroundColor: 'palegreen'},
  // four: {height: 1000, backgroundColor: 'royalblue'},
});
