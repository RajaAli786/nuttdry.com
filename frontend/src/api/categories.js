import axios from "axios";
import { BASE_URL } from "../config";

const API = axios.create({
  baseURL: BASE_URL + "/api",
});

export const fetchCategoriesAPI = async () => {
  const response = await API.get("/categories");
  return response.data;
};

export const fetchCategoryByIdAPI = async (id) => {
  const response = await API.get(`/categories/${id}`);
  return response.data;
};
