import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';

// import {postListState} from '../../../recoil/atoms';

import API from '../../../services/apiService';
import constants from '../../../constants';
import SearchBar from '../../../components/main/conversation/searchBar';
import Tile from '../../../components/main/music/tile';
import FullScreenLoader from '../../../components/fullScreenLoader';

export default function MusicSearch({navigation, route}) {
  const [isLoading, setIsLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const fetchSongs = async (text) => {
    try {
      // console
      Keyboard.dismiss();
      setIsLoading(true);
      const res = await API.searchSong(text);
      console.log('song res - ', res.data);
      setSongs([...res.data]);
      setIsLoading(false);
    } catch (e) {
      console.log('fetch songs error - ', e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, styles.coverAll]}>
        {isLoading && <FullScreenLoader />}
        <View style={[styles.container, styles.coverAll]}>
          <SearchBar cb={(text) => fetchSongs(text)} />
          <View style={[styles.tiles]}>
            <FlatList
              numColumns={2}
              columnWrapperStyle={{paddingVertical: 10}}
              data={songs}
              renderItem={({item}) => <Tile image={item.image} />}
              keyExtractor={() => Math.random().toString()}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  coverAll: {height: '100%', width: '100%'},
  container: {
    backgroundColor: constants.colors.chatBg,
    alignItems: 'center',
  },
  tiles: {paddingBottom: 60},
  // userImg: {height: 100, width: 100},
  // innerContainer: {},
  // scene: {height: 3000},
  // one: {height: 300, backgroundColor: 'tomato'},
  // two: {height: 100, backgroundColor: 'skyblue'},
  // three: {height: 1000, backgroundColor: 'palegreen'},
  // four: {height: 1000, backgroundColor: 'royalblue'},
});
