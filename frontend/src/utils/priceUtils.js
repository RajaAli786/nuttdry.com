export const splitTax = (amount, taxPercent = 0) => {
    const base =
      taxPercent > 0
        ? amount / (1 + taxPercent / 100)
        : amount;
  
    return {
      baseAmount: base,
      taxAmount: amount - base,
      total: amount,
    };
  };