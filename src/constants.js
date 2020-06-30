import { Dimensions, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

const isNotchPhone = DeviceInfo.hasNotch();
const iphoneNotch = Platform.OS === "ios" && isNotchPhone;

export default {
  colors: {
    chatBg: "#252331",
    msgSent: "#2467FD",
    msgReceived: "#343246",
    chatDate: "#666883",
    bottomNav: "#1E1C26",
    username: "#ffffff",
  },
  screen: {
    height: Math.round(Dimensions.get("window").height),
    width: Math.round(Dimensions.get("window").width),
    iphoneNotchBottomNavHeight: 80,
    bottomNavHeight() {
      return iphoneNotch ? 80 : 60;
    },
    postFlatlistHeight() {
      const bottomNavHeight = iphoneNotch ? 80 : 60;
      const topBarHeight = isNotchPhone ? 80 : 55;
      return (
        Math.round(Dimensions.get("window").height) -
        (bottomNavHeight + topBarHeight)
      );
    },
    randomString() {
      return Math.random().toString(36).split(".")[1];
    }
  },
  apiUrl: {
    local: "http://localhost:8000",
    live: "https://chatapp3690.herokuapp.com",
  },
  deviceInfo: DeviceInfo,
  dummy: {
    images: {
      post:
        "https://www.nasa.gov/sites/default/files/styles/image_card_4x3_ratio/public/thumbnails/image/iss063e012660.jpg",
      user: "https://i.ya-webdesign.com/images/user-avatar-png-7.png",
    },
  },
};
