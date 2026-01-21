import api from "./http";

export const applyCouponAPI = async (payload) => {
  const res = await api.post("/apply-coupon", payload);
  return res.data;
};
