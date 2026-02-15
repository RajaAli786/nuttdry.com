import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectCartItems,
  selectCartSubtotal,
  removeFromCart,
  updateQty,
  selectDiscount,
  selectAppliedCoupon,
} from "../redux/cartSlice";

import "../assets/css/CartDrawer.scss";

const CartDrawer = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Redux Selectors
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const discount = useSelector(selectDiscount);

  // Local State
  const [coupon, setCoupon] = useState("");
  const [orderNote, setOrderNote] = useState("");

  const finalTotal = subtotal - discount;

  // APPLY COUPON
  const applyCoupon = () => {
    if (coupon === "SAVE50") {
      dispatch(applyDiscount(50));
      alert("₹50 Discount Applied");
    } else {
      alert("Invalid Coupon Code");
    }
  };

  return (
    <>
      {/* Overlay */}
      {open && <div className="cart-overlay" onClick={() => setOpen(false)}></div>}

      {/* Drawer */}
      <div className={`cart-drawer ${open ? "open" : ""}`}>
        <div className="drawer-header d-flex justify-content-between align-items-center">
          <h4>Your Cart</h4>
          <i className="fa fa-close close-btn" onClick={() => setOpen(false)}></i>
        </div>

        <div className="drawer-content">
          {cartItems.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <>
              <table className="cart-table table ttable-bordered table-striped table-hover">
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.img} width="50" alt={item.name} />
                      </td>

                      <td style={{ verticalAlign: "middle" }}>{item.name}</td>

                      <td style={{ verticalAlign: "middle" }}>
                        <input
                          type="number"
                          min={1}
                          value={item.qty || 0}
                          className="qty-input"
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

                      <td style={{ verticalAlign: "middle", width: "80px"  }}>
                        ₹ {item.price * item.qty}
                      </td>

                      <td style={{ verticalAlign: "middle" }}>
                        <button
                          className="delete-btn"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* ---- SUBTOTAL ---- */}
              <div className="cart-summary">
                <div className="subtotal">
                  <strong>Subtotal:</strong> ₹ {subtotal}
                </div>

                <div className="subtotal">
                  <strong>Discount:</strong> -₹ {discount}
                </div>

                <div className="subtotal final-total">
                  <strong>Total:</strong> ₹ {finalTotal}
                </div>

                <small className="text-muted">
                  Taxes, discounts & shipping calculated at checkout.
                </small>


                

                <button onClick={() => {setOpen(false); navigate("/cardlist");}} className="checkout-btn">View All</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
