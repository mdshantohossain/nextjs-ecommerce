import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "@/config/api";

const token = Cookies.get("auth_token");

console.log("axios set upped...");

// create axios request wiht token
const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          API_URL + "/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        Cookies.set("auth_token", data.token, { expires: 7 });

        return axios(originalRequest);
      } catch (error) {
        Cookies.remove("auth_token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
