import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // headers: {
  //   Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  // },
});

api.interceptors.request.use((config) => {
  config.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
  config.headers["Pragma"] = "no-cache";
  config.headers["Expires"] = "0";

  config.params = {
    ...(config.params || {}),
    t: new Date().getTime(),
  };

  return config;
});

export default api;
