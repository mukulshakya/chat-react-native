/**
 * @format
 */

import {AppRegistry} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import App from './App.js';
import {name as appName} from './app.json';
import Player from './src/services/playerService';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => Player);
