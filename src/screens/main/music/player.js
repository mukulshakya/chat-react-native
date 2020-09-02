import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerProgress,
  useTrackPlayerEvents,
  TrackPlayerEvents,
} from 'react-native-track-player';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRecoilState} from 'recoil';
import {songListState} from '../../../recoil/atoms';

import TopBarWithUsernameAndBack from '../../../components/main/chat/topBarWithUserNameAndBack';
import API from '../../../services/apiService';
import constants from '../../../constants';
import Tile from '../../../components/main/music/tile';
import FullScreenLoader from '../../../components/fullScreenLoader';

export default function MusicPlayer({navigation, route}) {
  const playbackState = usePlaybackState();

  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [song, setSong] = useState(null);
  const [songsList, setSongsList] = useRecoilState(songListState);
  const [currentSongsList, setCurrentSongsList] = useState([]);
  const [songProgress, setSongProgress] = useState(0);

  const [trackTitle, setTrackTitle] = useState(null);
  const [trackArtist, setTrackArtist] = useState(null);
  const [trackArtwork, setTrackArtwork] = useState(null);

  useTrackPlayerEvents(
    ['playback-state', 'playback-track-changed', 'remote-seek', 'remote-pause'],
    async (event) => {
      console.log({event});
      if (event.type === 'playback-state') {
        setIsBuffering(['buffering', 6].includes(event.state));
        setIsPlaying(['playing', 3].includes(event.state));
      }
      if (event.type === TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        const {title, artist, artwork} = track || {};
        setTrackTitle(title);
        setTrackArtist(artist);
        setTrackArtwork(artwork);
      }
    },
  );

  useEffect(() => {
    if (route.params) {
      const {
        song,
        song: {title, artist, artwork},
      } = route.params;
      setSong(song);
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
      const uniqueSongList = [
        ...new Set([song, ...songsList].map((i) => JSON.stringify(i))),
      ].map((i) => JSON.parse(i));
      setCurrentSongsList([...uniqueSongList]);
      setIsLoading(false);
    }
    return () => {
      TrackPlayer.reset();
    };
  }, []);

  function ProgressBar() {
    const progress = useTrackPlayerProgress();

    return (
      <View style={styles.progress}>
        {/* <View style={{flex: progress.position, backgroundColor: 'red'}} />
        <View
          style={{flex: progress.bufferedPosition, backgroundColor: 'teal'}}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'grey',
          }}
        /> */}
        <Slider
          style={{flex: 1, height: 10}}
          thumbTouchSize={{width: 100, height: 100}}
          minimumValue={0}
          maximumValue={song?.duration || progress.duration || 100}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor={constants.colors.bottomNav}
          value={progress.position || songProgress}
          onSlidingComplete={(value) => {
            setSongProgress(value);
            TrackPlayer.seekTo(value);
          }}
        />
      </View>
    );
  }

  async function togglePlayback() {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (!currentTrack) {
      await TrackPlayer.reset();
      await TrackPlayer.add(currentSongsList);
      await TrackPlayer.play();
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  }

  async function skipToNext() {
    try {
      setSongProgress(0);
      await TrackPlayer.skipToNext();
    } catch (_) {}
  }

  async function skipToPrevious() {
    try {
      setSongProgress(0);
      await TrackPlayer.skipToPrevious();
    } catch (_) {}
  }

  return (
    <View style={[styles.container, styles.coverAll]}>
      {isLoading && <FullScreenLoader />}
      <TopBarWithUsernameAndBack navigation={navigation} username="Player" />
      <View style={styles.innerContainer}>
        <View style={styles.tile}>
          <Tile
            song={song}
            trackArtwork={trackArtwork}
            isLoading={isBuffering}
            fromPlayer
          />
        </View>
        <View
          style={[styles.titleWrapper, {width: constants.screen.width - 40}]}>
          <Text style={[styles.title, {textAlign: 'center'}]}>
            {trackTitle || song?.title || 'Song Name'}
          </Text>
        </View>
        <ProgressBar />
        <View style={styles.controlBtns}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.titleWrapper, {transform: [{rotate: '90deg'}]}]}
            onPress={skipToPrevious}>
            <MaterialCommunityIcons
              name={'arrow-down-thick'}
              color={constants.colors.username}
              size={60}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.titleWrapper, {marginHorizontal: 30}]}
            onPress={togglePlayback}>
            <MaterialCommunityIcons
              name={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
              color={constants.colors.username}
              size={60}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.titleWrapper, {transform: [{rotate: '270deg'}]}]}
            onPress={skipToNext}>
            <MaterialCommunityIcons
              name={'arrow-down-thick'}
              color={constants.colors.username}
              size={60}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function getStateName(state) {
  switch (state) {
    case TrackPlayer.STATE_NONE:
      return 'None';
    case TrackPlayer.STATE_PLAYING:
      return 'Playing';
    case TrackPlayer.STATE_PAUSED:
      return 'Paused';
    case TrackPlayer.STATE_STOPPED:
      return 'Stopped';
    case TrackPlayer.STATE_BUFFERING:
      return 'Buffering';
  }
}

const styles = StyleSheet.create({
  coverAll: {flex: 1},
  container: {
    backgroundColor: constants.colors.chatBg,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  innerContainer: {alignItems: 'center'},
  tile: {marginTop: '20%'},
  tiles: {paddingBottom: 60},
  titleWrapper: {marginVertical: 20},
  title: {color: constants.colors.username},
  progress: {
    height: 5,
    width: '80%',
    marginTop: 10,
    flexDirection: 'row',
  },
  controlBtns: {flexDirection: 'row'},
});
