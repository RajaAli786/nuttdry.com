import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Badge,
} from "react-bootstrap";
import { toast } from "react-toastify";
import Layout from "./common/Layout";

import {
  selectCartItems,
  selectCartSubtotal,
  clearCart,
  updateQty,
  selectDiscount,
  selectAppliedCoupon,
} from "../redux/cartSlice";

import { startRazorpayPayment } from "../api/razorpay";
import api from "../api/http";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const couponDiscount = useSelector(selectDiscount);
  const appliedCoupon = useSelector(selectAppliedCoupon);

  const user = useSelector((state) => state.auth?.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= CALCULATIONS ================= */
  const priceData = cartItems.map((item) => {
    const unitPrice = Number(item.price) || 0;
    const qty = Number(item.qty) || 0;
    const taxPercent = Number(item.taxPercent) || 0;

    const subtotal = unitPrice * qty;
    const taxAmount = (subtotal * taxPercent) / 100;
    const finalAmount = subtotal - taxAmount;

    return {
      ...item,
      subtotal,
      taxAmount,
      finalAmount,
    };
  });

  const totalSubtotal = priceData.reduce((sum, item) => sum + item.subtotal, 0);
  const totalTax = priceData.reduce((sum, item) => sum + item.taxAmount, 0);
  const itemsTotal = priceData.reduce((sum, item) => sum + item.finalAmount, 0);
  const grandTotall = Math.max(itemsTotal - couponDiscount, 0);
  const grandTotal = Math.round(grandTotall);
  /* ================= PLACE ORDER ================= */
  const handlePlaceOrder = () => {
    if (!user) {
      toast.warning("Please login to place your order");
      navigate("/login", { state: { redirect: "/checkout" } });
      return;
    }

    const { name, email, phone, address } = formData;

    if (!name || !email || !phone || !address) {
      toast.error("Please fill all billing details");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    startRazorpayPayment({
      amount: grandTotal,
      user,
      onSuccess: handlePaymentSuccess,
    });
  };

 console. log("cartItems:", cartItems);
  const handlePaymentSuccess = async (response) => {
    try {
      await api.post("/place-order", {
        cartItems,
        formData,
        grandTotal,
        subtotal: totalSubtotal,
        totalTax,
        couponDiscount,
        appliedCoupon,
        paymentId: response.razorpay_payment_id,
      });

      toast.success("Payment successful 🎉 Order placed!");
      dispatch(clearCart());
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while placing order!");
    }
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <Container className="py-5 text-center">
          <h3>Your cart is empty</h3>
          <Button onClick={() => navigate("/products")}>Continue Shopping</Button>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container className="py-5">
        <h2 className="mb-4">Checkout</h2>
        <Row>
          {/* LEFT */}
          <Col md={6}>
            <Card className="p-4 shadow-sm">
              <h4>Billing Details</h4>
              <Form>
                {["name", "email", "phone"].map((field) => (
                  <Form.Group className="mb-3" key={field}>
                    <Form.Label>{field.toUpperCase()}</Form.Label>
                    <Form.Control
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                    />
                  </Form.Group>
                ))}
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </Card>
          </Col>

          {/* RIGHT */}
          <Col md={6}>
            <Card className="p-4 shadow-sm">
              <h4>Order Summary</h4>

              <Table borderless>
                <tbody>
                  {priceData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <strong>{item.name}</strong>
                        <br />
                        Qty: {item.qty}
                        <br />
                        Price: ₹ {item.price}
                        {item.taxPercent > 0 && (
                          <div className="text-muted small">
                            Tax ({item.taxPercent}%): ₹ {item.taxAmount.toFixed(2)}
                          </div>
                        )}
                      </td>
                      <td className="text-end">₹ {item.finalAmount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {appliedCoupon && (
                <div className="text-success mb-2">
                  <strong>Coupon Applied:</strong> {appliedCoupon.title} (
                  {appliedCoupon.type === "percent"
                    ? `${appliedCoupon.value}%`
                    : `₹ ${appliedCoupon.value}`}
                  )
                </div>
              )}

              <hr />

              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <strong>₹ {totalSubtotal.toFixed(2)}</strong>
              </div>

              <div className="d-flex justify-content-between text-muted">
                <span>Total Tax</span>
                <strong>₹ {totalTax.toFixed(2)}</strong>
              </div>

              {couponDiscount > 0 && (
                <div className="d-flex justify-content-between text-success">
                  <span>Coupon Discount</span>
                  <strong>- ₹ {couponDiscount.toFixed(2)}</strong>
                </div>
              )}

              <hr />

              <div className="d-flex justify-content-between fs-5">
                <strong>Grand Total</strong>
                <strong>₹ {grandTotal.toFixed(2)}</strong>
              </div>

              <Button
                variant="success"
                className="mt-3 w-100"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Checkout;
