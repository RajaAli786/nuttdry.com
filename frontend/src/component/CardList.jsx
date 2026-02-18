import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "./common/Layout";
import SEO from "./common/SEO";

import { calculateTotals } from "../utils/calculateTotals";

import {
  selectCartItems,
  removeFromCart,
  updateQty,
  applyDiscount,
  selectDiscount,
  selectAppliedCoupon,
} from "../redux/cartSlice";

import { applyCouponAPI } from "../api/coupon";

import "../assets/css/CartDrawer.scss";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const couponDiscount = useSelector(selectDiscount);
  const appliedCoupon = useSelector(selectAppliedCoupon);

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  /* ================= CALCULATIONS ================= */
  const {
    priceData,
    totalBaseAmount,
    totalTax,
    totalSubtotal,
    grandTotal,
  } = calculateTotals(cartItems, couponDiscount);

  /* ================= COUPON ================= */

  const applyCouponHandler = async () => {
    if (!couponCode) {
      setCouponError("Please enter coupon code");
      dispatch(applyDiscount({ discount: 0, coupon: null }));
      return;
    }

    try {
      const res = await applyCouponAPI({
        code: couponCode,
        subtotal: totalBaseAmount,
      });

      if (res.success) {
        dispatch(
          applyDiscount({
            discount: res.data.discount,
            coupon: {
              code: res.data.code,
              title: res.data.title,
              type: res.data.type,
              value: res.data.value,
            },
          })
        );
        setCouponError("");
      } else {
        dispatch(applyDiscount({ discount: 0, coupon: null }));
        setCouponError(res.message);
      }
    } catch (err) {
      dispatch(applyDiscount({ discount: 0, coupon: null }));
      setCouponError(
        err?.response?.data?.message || "Invalid coupon code"
      );
    }
  };

  return (
    <Layout>
      <SEO
        title={"NuttDry | Nuts Cart - Premium Quality Dry Fruits Online"}
        description="Review your selected dry fruits in the cart."
        keywords="dry fruits cart, apply coupons, checkout"
      />

      <div className="container py-5">
        <h2 className="mb-4 text-center fw-bold">Your Cart</h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <h5>Your cart is empty 😔</h5>
            <button
              className="btn btn-dark mt-3"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="row g-4">

            {/* LEFT */}
            <div className="col-lg-8">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">Cart Items</h5>

                  <table className="table table-bordered">
                    <tbody>
                      {priceData.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <strong>{item.name}</strong>
                            <br />
                            Qty: {item.qty}
                          </td>

                          <td>
                            Base: ₹ {item.baseAmount.toFixed(2)}
                            <br />
                            Tax: ₹ {item.taxAmount.toFixed(2)}
                            <br />
                            <strong>
                              ₹ {item.finalAmount.toFixed(2)}
                            </strong>
                          </td>

                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() =>
                                dispatch(removeFromCart(item.id))
                              }
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-lg-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5>Order Summary</h5>

                  <div className="d-flex justify-content-between">
                    <span>Base Amount</span>
                    <strong>₹ {totalBaseAmount.toFixed(2)}</strong>
                  </div>

                  <div className="d-flex justify-content-between text-muted">
                    <span>Total Tax</span>
                    <strong>₹ {totalTax.toFixed(2)}</strong>
                  </div>

                  <div className="d-flex justify-content-between">
                    <span>Subtotal</span>
                    <strong>₹ {totalSubtotal.toFixed(2)}</strong>
                  </div>

                  <div className="d-flex justify-content-between text-success">
                    <span>Coupon Discount</span>
                    <strong>- ₹ {couponDiscount}</strong>
                  </div>

                  {appliedCoupon && (
                  <div className="p-2 mb-2 border rounded bg-light">
                    <div className="fw-semibold text-success">
                      🎟 {appliedCoupon.title}
                    </div>

                    <small className="text-muted d-block">
                      Code: {appliedCoupon.code}
                    </small>

                    <small className="text-muted">
                      {appliedCoupon.type === "flat"
                        ? `Flat ₹${Number(appliedCoupon.value).toFixed(2)} OFF`
                        : `${appliedCoupon.value}% OFF`}
                    </small>
                  </div>
                )}


                  <hr />

                  <div className="d-flex justify-content-between fs-5">
                    <strong>Grand Total</strong>
                    <strong>₹ {grandTotal.toFixed(2)}</strong>
                  </div>

                  {/* Coupon Section */}
                    <div className="mt-3">

                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setCouponError("");
                      }}
                    />

                    {couponError && (
                      <small className="text-danger d-block mb-2">
                        {couponError}
                      </small>
                    )}

                    <button
                      className="btn btn-primary w-100"
                      onClick={applyCouponHandler}
                    >
                      Apply Coupon
                    </button>

                    </div>

                  <button
                    className="btn btn-success w-100 mt-3"
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
