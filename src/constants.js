import { Dimensions } from "react-native";

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
  },
  apiUrl: {
    local: "http://localhost:8000",
    live: "https://chatapp3690.herokuapp.com",
  },
};
