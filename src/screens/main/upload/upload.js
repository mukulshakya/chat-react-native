import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageResizer from 'react-native-image-resizer';
import {useRecoilState} from 'recoil';
import {postListState} from '../../../recoil/atoms';

import constants from '../../../constants';
import API from '../../../services/apiService';
import CaptionInput from '../../../components/main/upload/captionInput';
import TopBarWithUsernameAndBack from '../../../components/main/chat/topBarWithUserNameAndBack';
import FullScreenLoader from '../../../components/fullScreenLoader';

export default function Posts({navigation, route}) {
  const [posts, setPosts] = useRecoilState(postListState);
  const [imageSource, setImageSource] = useState({uri: '', type: ''});
  const [payload, setPayload] = useState({
    image: '',
    caption: '',
    fullImageResponse: '',
  });
  const [isPostReady, setIsPostReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clearCaption, setClearCaption] = useState(false);

  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({tabBarVisible: false});
    return () => parent.setOptions({tabBarVisible: true});
  }, []);

  const submitForm = async () => {
    try {
      setIsLoading(true);
      const response = await API.uploadPost(payload);
      if (response.status === 200) {
        const {data, success} = response.data;
        const user = await AsyncStorage.getItem('user');
        success &&
          setPosts((oldPosts) => [
            {...data, user: JSON.parse(user)},
            ...oldPosts,
          ]);
        setTimeout(() => {
          setIsLoading(false);
          navigation.goBack();
          setImageSource({uri: '', type: ''});
          setPayload({
            image: '',
            caption: '',
            fullImageResponse: '',
          });
          setIsPostReady(false);
          setClearCaption(true);
        }, 1000);
      }
    } catch (e) {
      Alert.alert('Error! please try again');
      setIsLoading(false);
      console.log('submit post error - ', e);
    }
  };

  const askStoragePermission = async () => {
    console.log('ok');
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
    } catch (e) {
      console.log({e});
    }
  };

  const onPickImage = () => {
    ImagePicker.showImagePicker({}, (response) => {
      //   console.log({ response: response.type });
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        if (
          response.error === "Permissions weren't granted" &&
          Platform.OS === 'android'
        ) {
          console.log('hello');
          request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((result) => {
            console.log({result});
          });
        }
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const {uri, type} = response;
        console.log({type});
        setImageSource({uri, type});
        compressImage(uri);
      }
    });
  };

  const compressImage = async (imageUri) => {
    const newWidth = 896;
    const newHeight = 414;
    const compressFormat = 'JPEG';
    const quality = 80;
    try {
      const response = await ImageResizer.createResizedImage(
        imageUri,
        newWidth,
        newHeight,
        compressFormat,
        quality,
      );
      uploadImage(response);
    } catch (e) {
      console.log('Image compression error - ', e);
    }
  };

  const uploadImage = async ({uri, name, path}) => {
    try {
      const response = await API.uploadImage({
        uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
        type: imageSource.type,
        name,
        path,
      });
      if (response.status === 200) {
        const {data, success} = response.data;
        if (success) {
          payload.image = data.link;
          payload.fullImageResponse = JSON.stringify(data);
          setPayload(payload);
          setIsPostReady(true);
        }
      }
    } catch (e) {
      console.log('Upload image - ', e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {isLoading && <FullScreenLoader />}
        <TopBarWithUsernameAndBack
          navigation={navigation}
          username="New Post"
          sharePost={submitForm}
          isPostReady={isPostReady}
          fromUpload
        />

        <View style={{paddingHorizontal: '5%'}}>
          <View style={styles.imagePicker}>
            {!!imageSource.uri && !isPostReady && <FullScreenLoader />}
            <TouchableOpacity
              onPress={onPickImage}
              style={[imageSource.uri && styles.postImg]}>
              {imageSource.uri ? (
                <View>
                  <Image source={imageSource} style={styles.postImg} />
                  <Text
                    style={styles.closeIcon}
                    onPress={() => setImageSource({uri: ''})}>
                    ✕
                  </Text>
                </View>
              ) : (
                <MaterialCommunityIcons
                  name="plus"
                  color={constants.colors.username}
                  size={60}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.captionInputWrapper}>
            <CaptionInput
              navigation={navigation}
              saveCaption={(value) => {
                payload.caption = value;
                setPayload(payload);
              }}
              isClear={clearCaption}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: constants.colors.chatBg, flex: 1},
  innerContainer: {},
  postImg: {width: '100%', height: constants.screen.height / 4},
  imagePicker: {
    width: '100%',
    height: constants.screen.height / 4,
    backgroundColor: constants.colors.bottomNav,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captionInputWrapper: {marginTop: 20},
  closeIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    fontSize: 25,
    fontWeight: '900',
    textShadowOffset: {height: 2},
    textShadowColor: '#fff',
    textShadowRadius: 2,
  },
});
