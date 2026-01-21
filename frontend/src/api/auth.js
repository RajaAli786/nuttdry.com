import api from "./http";

export const login = async (payload) => {
  const res = await api.post("/login", payload);
  return res.data;
};

export const registerUser = async (payload) => {
  const res = await api.post("/register", payload);
  return res.data;
};

export const getUser = async () => {
  const res = await api.get("/user");
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/logout");
  return res.data;
};
