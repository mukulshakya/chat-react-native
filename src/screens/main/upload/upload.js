import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  AsyncStorage,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import ImagePicker from "react-native-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ImageResizer from "react-native-image-resizer";

import constants from "../../../constants";
import API from "../../../services/apiService";
// import Header from "../../../components/header";
// import Post from "../../../components/main/home/post";
import CaptionInput from "../../../components/main/upload/captionInput";
import TopBarWithUsernameAndBack from "../../../components/main/chat/topBarWithUserNameAndBack";

export default function Posts({ navigation, route }) {
  const [imageSource, setImageSource] = useState({ uri: "", type: "" });
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({ tabBarVisible: false });
    return () => parent.setOptions({ tabBarVisible: true });
  }, []);

  const onPickImage = () => {
    ImagePicker.showImagePicker({}, (response) => {
      //   console.log({ response: response.type });
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const { uri, type } = response;
        setImageSource({ uri, type });
        compressImage(uri);
      }
    });
  };

  const compressImage = async (imageUri) => {
    console.log(imageUri);
    const newWidth = 896;
    const newHeight = 414;
    const compressFormat = "JPEG";
    const quality = 80;
    try {
      const response = await ImageResizer.createResizedImage(
        imageUri,
        newWidth,
        newHeight,
        compressFormat,
        quality
      );
      uploadImage(response);
    } catch (e) {
      console.log("Image compression error - ", e);
    }
  };

  const uploadImage = async ({ uri, name }) => {
    try {
      const response = await API.uploadImage({
        uri,
        type: imageSource.type,
        name,
      });
    } catch (e) {
      console.log("Upload image - ", e);
    }
  };

  return (
    <View style={styles.container}>
      <TopBarWithUsernameAndBack
        navigation={navigation}
        username="New Post"
        fromUpload
      />
      <View style={{ paddingHorizontal: "5%" }}>
        <View style={styles.imagePicker}>
          <TouchableOpacity
            onPress={onPickImage}
            style={[imageSource.uri && styles.postImg]}
          >
            {imageSource.uri ? (
              <View>
                <Image source={imageSource} style={styles.postImg} />
                <Text
                  style={styles.closeIcon}
                  onPress={() => setImageSource({ uri: "" })}
                >
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
          <CaptionInput navigation={navigation} />
        </View>
      </View>
    </View>
  );
}

/**
{"uri": "file:///Users/mukulshakya/Library/Developer/CoreSimulator/Devices/1A4D5296-3FEC-46BD-A53E-81B7F7E4351A/data/Containers/Data/Application/499BE6AB-8CC3-44D9-AEE5-3DFD1ED040FC/Documents/images/67B076F8-0343-419E-8001-A99DB81364F8.jpg"}
 */

const styles = StyleSheet.create({
  container: { backgroundColor: constants.colors.chatBg, flex: 1 },
  innerContainer: {},
  postImg: { width: "100%", height: constants.screen.height / 4 },
  imagePicker: {
    width: "100%",
    height: constants.screen.height / 4,
    backgroundColor: constants.colors.bottomNav,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  captionInputWrapper: { marginTop: 20 },
  closeIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    fontSize: 25,
    fontWeight: "900",
    textShadowOffset: { height: 2 },
    textShadowColor: "#fff",
    textShadowRadius: 2,
  },
});
