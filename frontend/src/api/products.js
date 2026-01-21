import axios from "axios";
import { BASE_URL } from "../config";

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
});


export const fetchProductsAPI = async ({
  page = 1,
  limit = 12,
  search = "",
  category_id = "",
  menu_id = "",
  priceRange = "",
  sort = "",
  is_featured = "",
  is_top = "",
  is_new = "",
}) => {
  const params = {
    page,
    limit,
  };

  if (search) params.q = search;
  if (category_id) params.category_id = category_id;
  if (menu_id) params.menu_id = menu_id;
  if (priceRange) params.max_price = priceRange;
  if (sort) params.sort = sort;
  if (is_featured !== "") params.is_featured = is_featured;
  if (is_top !== "") params.is_top = is_top;
  if (is_new !== "") params.is_new = is_new;

  const response = await API.get("/products", { params });
  return response.data;
};

export const fetchProductByIdAPI = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};

export const fetchMaxPriceAPI = async () => {
  const response = await API.get("/products/price-range");
  return response.data;
};
