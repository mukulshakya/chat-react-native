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
import {useRecoilState} from 'recoil';
import {songListState} from '../../../recoil/atoms';

import API from '../../../services/apiService';
import constants from '../../../constants';
import SearchBar from '../../../components/main/conversation/searchBar';
import Tile from '../../../components/main/music/tile';
import FullScreenLoader from '../../../components/fullScreenLoader';

export default function MusicSearch({navigation, route}) {
  const [isLoading, setIsLoading] = useState(false);
  const [songs, setSongs] = useRecoilState(songListState);
  const fetchSongs = async (text) => {
    try {
      Keyboard.dismiss();
      setIsLoading(true);
      const res = await API.searchSong(text);
      const convertedSongs = res.data.map(
        ({id, media_url, song, album, singers, image, duration}) => ({
          id: id,
          url: media_url,
          title: song + ' - ' + singers,
          artist: singers,
          artwork: image,
          duration: parseInt(duration),
        }),
      );

      setSongs([...convertedSongs]);
      setIsLoading(false);
    } catch (e) {
      console.log('fetch songs error - ', e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, styles.coverAll]}>
        {isLoading && <FullScreenLoader />}
        <View
          style={[
            styles.container,
            styles.coverAll,
            {marginTop: constants.screen.isAndroid ? 20 : 0},
          ]}>
          <SearchBar cb={(text) => fetchSongs(text)} />
          <View style={[styles.tiles]}>
            <FlatList
              numColumns={2}
              columnWrapperStyle={{paddingVertical: 10}}
              data={songs}
              renderItem={({item}) => (
                <Tile song={item} navigation={navigation} />
              )}
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
