import axios from "axios";
import { AsyncStorage } from "react-native";
import constants from "../constants";

const api = axios.create({ baseURL: constants.apiUrl.local });

api.interceptors.request.use(
  async function (config) {
    const token = await AsyncStorage.getItem("token");
    if (token) return { ...config, headers: { Authorization: token } };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const func = {};

func.register = async (payload) => {
  try {
    // console.log({ payload });
    const res = await api.post("/register", payload);
    // console.log({ res });
    return res;
  } catch (error) {
    return error;
  }
};

func.login = async (payload) => {
  try {
    const res = await api.post("/login", payload);
    return res;
  } catch (error) {
    return error;
  }
};

func.profile = async () => {
  try {
    const res = await api.get("/profile");
    return res;
  } catch (error) {
    return error;
  }
};

func.getUsers = async () => {
  try {
    const res = await api.get("/users");
    return res;
  } catch (error) {
    return error;
  }
};

func.getPosts = async () => {
  try {
    const res = await api.get("/posts");
    return res;
  } catch (error) {
    return error;
  }
};

func.uploadPost = async (payload) => {
  try {
    const res = await api.post("/posts", payload);
    return res;
  } catch (error) {
    return error;
  }
};

func.uploadImage = async ({ uri, type, name }) => {
  try {
    console.log({ uri, type, name });
    const formData = new FormData();
    formData.append("image", {
      uri,
      type: type || "image/jpeg",
      name: name || Math.random().toString(36).split(".")[1] + ".jpg",
    });

    const res = await axios({
      url: "https://api.imgur.com/3/upload",
      headers: {
        Authorization: "Client-ID " + constants.imgur.clientId,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: formData,
    });
    console.log({ res });
    return res;
  } catch (error) {
    return error;
  }
};

export default func;
