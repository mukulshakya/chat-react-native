import * as React from 'react';
import AppNavigator from './src/navigation/appNavigator';
import {RecoilRoot} from 'recoil';
import TrackPlayer from 'react-native-track-player';

export default function App() {
  React.useEffect(() => {
    setup();
  }, []);

  async function setup() {
    await TrackPlayer.setupPlayer({});
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_SEEK_TO,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ],
    });
  }

  return (
    <RecoilRoot>
      <AppNavigator />
    </RecoilRoot>
  );
}
