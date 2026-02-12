import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "./common/Layout";

import {
  selectCartItems,
  selectCartSubtotal,
  selectDiscount,
  removeFromCart,
  updateQty,
  applyDiscount,
} from "../redux/cartSlice";

import "../assets/css/CartDrawer.scss";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const discount = useSelector(selectDiscount);

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  const finalTotal = Math.max(subtotal - discount, 0);

  const applyCouponHandler = () => {
    if (!couponCode) {
      setCouponError("Please enter coupon code");
      return;
    }

    if (couponCode === "SAVE50") {
      dispatch(applyDiscount(50));
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  return (
    <Layout>
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
                        <th style={{width: "80px" }}>Price</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {cartItems.map((item) => (
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

                          <td className="fw-semibold">
                            ₹ {item.price * item.qty}
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
                    <span>Subtotal</span>
                    <strong>₹ {subtotal}</strong>
                  </div>

                  <div className="d-flex justify-content-between mb-2 text-success">
                    <span>Discount</span>
                    <strong>- ₹ {discount}</strong>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between fs-5 mb-3">
                    <strong>Total</strong>
                    <strong>₹ {finalTotal}</strong>
                  </div>

                  {/* COUPON */}
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
                      <small className="text-danger">
                        {couponError}
                      </small>
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

                  <small className="text-muted d-block mt-2">
                    Taxes & shipping calculated at checkout
                  </small>
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
