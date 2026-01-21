import axios from "axios";
import { BASE_URL } from "../config";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// ✅ Auto inject token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 🔑 dynamic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
