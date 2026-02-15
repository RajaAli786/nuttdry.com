import api from "./http";

export const applyCouponAPI = async (payload) => {
  const res = await api.post("/coupon/validate", payload);
  return res.data;
};
