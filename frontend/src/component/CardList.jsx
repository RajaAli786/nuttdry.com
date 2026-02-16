import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "./common/Layout";
import SEO from "./common/SEO";
import { splitTax } from "../utils/priceUtils";

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

  const priceData = cartItems.map((item) => {
    const unitPrice = Number(item.price) || 0;
    const qty = Number(item.qty) || 0;
    const taxPercent = Number(item.taxPercent) || 0;

    const subtotal = unitPrice * qty; // tax included price

    const { baseAmount, taxAmount, total } =
    splitTax(subtotal, taxPercent);

    const finalAmount = total;

    return {
      ...item,
      subtotal,
      baseAmount,
      taxAmount,
      finalAmount,
    };
  });



  /* ===== TOTALS ===== */

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

  const grandTotal = Math.max(totalBaseAmount - couponDiscount, 0);

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

      console.log("Coupon API response:", res);

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

      const msg =
        err?.response?.data?.message || "Invalid coupon code";

      setCouponError(msg);
    }
  };


  return (
    <Layout>
      <SEO
        title={'NuttDry | Nuts Cart - Premium Quality Dry Fruits Online'}

        description={
          "Review your selected dry fruits in the cart. Update quantities, apply coupons, and proceed to checkout for a healthy shopping experience."
        }

        keywords={
          "dry fruits cart, review cart, update quantities, apply coupons, proceed to checkout"
        }
      />
      <div className="container py-5">
        <h2 className="mb-4 text-center fw-bold">Your Cart</h2>
        <div className="border"></div>

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

            {/* ================= LEFT CART ================= */}
            <div className="col-lg-8">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">Cart Items</h5>

                  <table className="table align-middle table-bordered table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {priceData.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <img
                                src={item.img}
                                alt={item.name}
                                width="60"
                                className="rounded border"
                              />
                              <div>
                                <div className="fw-semibold">
                                  {item.name}
                                </div>
                                <small className="text-muted">
                                  ₹ {item.price}
                                </small>
                              </div>
                            </div>
                          </td>

                          <td style={{ width: "120px" }}>
                            <input
                              type="number"
                              min={1}
                              value={item.qty}
                              className="form-control form-control-sm"
                              onChange={(e) =>
                                dispatch(
                                  updateQty({
                                    id: item.id,
                                    qty: Number(e.target.value),
                                  })
                                )
                              }
                            />
                          </td>

                          <td>
                            <div>
                              <div>
                                ₹ {item.baseAmount.toFixed(2)}
                              </div>

                              {item.taxPercent > 0 && (
                                <>
                                  <div className="text-muted small">
                                    Base: ₹ {item.price} × {item.qty}
                                  </div>

                                  <div className="text-muted small">
                                    {item.taxTitle} ({item.taxPercent}%):
                                    ₹ {item.taxAmount.toFixed(2)}
                                  </div>
                                </>
                              )}

                              <div className="fw-bold mt-1">
                                ₹ {item.finalAmount.toFixed(2)}
                              </div>
                            </div>
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

            {/* ================= RIGHT SUMMARY ================= */}
            <div className="col-lg-4">
              <div
                className="card shadow-sm border-0"
                style={{ position: "sticky", top: "100px" }}
              >
                <div className="card-body">
                  <h5 className="fw-bold mb-3">Order Summary</h5>

                  <div className="d-flex justify-content-between mb-2">
                    <span>Base Amount</span>
                    <strong>₹ {totalBaseAmount.toFixed(2)}</strong>
                  </div>

                  <div className="d-flex justify-content-between mb-2 text-muted">
                    <span>Total Tax</span>
                    <strong>₹ {totalTax.toFixed(2)}</strong>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span>MRP (Incl. Tax)</span>
                    <strong>₹ {totalSubtotal.toFixed(2)}</strong>
                  </div>

                  <div className="d-flex justify-content-between mb-2 text-success">
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
                          ? `Flat ₹${appliedCoupon.value} OFF`
                          : `${appliedCoupon.value}% OFF`}
                      </small>
                    </div>
                  )}

                  <hr />

                  <div className="d-flex justify-content-between fs-5 mb-3">
                    <strong>Grand Total</strong>
                    <strong>₹ {grandTotal.toFixed(2)}</strong>
                  </div>

                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setCouponError("");
                      }}
                    />
                    {couponError && (
                      <small className="text-danger">{couponError}</small>
                    )}
                  </div>

                  <button
                    className="btn btn-primary w-100 mb-2"
                    onClick={applyCouponHandler}
                  >
                    Apply Coupon
                  </button>

                  <button
                    className="btn btn-success w-100"
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
