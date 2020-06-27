import axios from "axios";
import { AsyncStorage } from "react-native";

const api = axios.create({ baseURL: "http://localhost:8000" });

api.interceptors.request.use(
  async function (config) {
    const token = await AsyncStorage.getItem("token");
    if (token)
      return { ...config, headers: { Authorization: token } };
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
    const res = await api.post("/register", payload);
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

export default func;
