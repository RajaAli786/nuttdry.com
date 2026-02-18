import { splitTax } from "./priceUtils";

export const calculateTotals = (cartItems = [], couponDiscount = 0) => {

  const priceData = cartItems.map((item) => {
    const unitPrice = Number(item.price) || 0;
    const qty = Number(item.qty) || 0;
    const taxPercent = Number(item.taxPercent) || 0;

    const subtotal = unitPrice * qty; // tax included

    const { baseAmount, taxAmount, total } =
      splitTax(subtotal, taxPercent);

    return {
      ...item,
      subtotal,
      baseAmount,
      taxAmount,
      finalAmount: total,
    };
  });

  // totals
  const totalBaseAmount = priceData.reduce(
    (sum, item) => sum + item.baseAmount,
    0
  );

  const totalTax = priceData.reduce(
    (sum, item) => sum + item.taxAmount,
    0
  );

  const totalSubtotal = priceData.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  // 🔥 EXACTLY YOUR REQUIRED LOGIC
  const grandTotal = Math.max(
    totalBaseAmount - Number(couponDiscount || 0),
    0
  );

  return {
    priceData,
    totalBaseAmount,
    totalTax,
    totalSubtotal,
    grandTotal,
  };
};
