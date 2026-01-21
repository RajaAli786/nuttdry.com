// api/razorpay.js
import { toast } from "react-toastify";

/**
 * Load Razorpay SDK dynamically
 * @returns {Promise<boolean>}
 */
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Start Razorpay Payment
 * @param {Object} options
 *   - amount: number (INR)
 *   - user: {name, email, phone}
 *   - onSuccess: callback function
 */
export const startRazorpayPayment = async ({ amount, user, onSuccess }) => {
  const res = await loadRazorpayScript();

  if (!res) {
    toast.error("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY, // Vite environment variable
    amount: amount * 100, // paise me convert
    currency: "INR",
    name: "My Store",
    description: "Order Payment",
    handler: function (response) {
      if (onSuccess) onSuccess(response);
    },
    prefill: {
      name: user.name,
      email: user.email,
      contact: user.phone,
    },
    theme: {
      color: "#28a745",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
