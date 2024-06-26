import axios from "axios";
import { getCookie } from "cookies-next";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3030",
  timeout: 1000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
