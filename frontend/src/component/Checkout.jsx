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
    applyCoupon,
    selectCouponDiscount,
    selectCouponApplied,
    selectCouponLoading,
} from "../redux/couponSlice";

import {
    selectCartItems,
    selectCartSubtotal,
    clearCart,
    updateQty,
} from "../redux/cartSlice";

import { startRazorpayPayment } from "../api/razorpay";
import api from "../api/http";

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector(selectCartItems);
    const subtotal = useSelector(selectCartSubtotal);

    const couponDiscount = useSelector(selectCouponDiscount);
    const couponApplied = useSelector(selectCouponApplied);
    const couponLoading = useSelector(selectCouponLoading);

    const user = useSelector((state) => state.auth?.user);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const [coupon, setCoupon] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const productDiscountTotal = cartItems.reduce((total, item) => {
        if (item.discount > 0) {
            return total + ((item.price * item.discount) / 100) * item.qty;
        }
        return total;
    }, 0);

    const grandTotal = Math.max(subtotal - productDiscountTotal - couponDiscount, 0);

    const handleApplyCoupon = () => {
        if (!coupon) {
            toast.error("Please enter coupon code");
            return;
        }

        dispatch(applyCoupon({ code: coupon, subtotal }))
            .unwrap()
            .then((res) => {
                toast.success(res.message || "Coupon applied successfully 🎉");
            })
            .catch((err) => {
                toast.error(err || "Invalid coupon code");
            });
    };

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

    const handlePaymentSuccess = async (response) => {
        try {
            await api.post("/place-order", {
                cartItems,
                formData,
                grandTotal,
                subtotal,
                productDiscount: productDiscountTotal,
                couponDiscount,
                couponCode: couponApplied ? coupon : null,
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
                                    {cartItems.map((item) => {
                                        const discountAmount = item.discount
                                            ? (item.price * item.discount) / 100
                                            : 0;
                                        const finalPrice = (item.price - discountAmount) * item.qty;

                                        return (
                                            <tr key={item.id}>
                                                <td>
                                                    <strong>{item.name}</strong>
                                                    <br />
                                                    Qty:
                                                    <input
                                                        type="number"
                                                        value={item.qty}
                                                        min={1}
                                                        onChange={(e) =>
                                                            dispatch(
                                                                updateQty({
                                                                    id: item.id,
                                                                    qty: Number(e.target.value),
                                                                })
                                                            )
                                                        }
                                                        style={{ width: "60px", marginLeft: "5px" }}
                                                    />
                                                    {item.discount > 0 && (
                                                        <Badge bg="success" className="ms-2">
                                                            {item.discount}% OFF
                                                        </Badge>
                                                    )}
                                                </td>
                                                <td className="text-end">₹ {finalPrice}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>

                            {/* COUPON */}
                            <div className="d-flex gap-2 mb-3">
                                <input
                                    className="form-control"
                                    placeholder="Enter coupon code"
                                    value={coupon}
                                    onChange={(e) => setCoupon(e.target.value)}
                                />
                                <Button
                                    onClick={handleApplyCoupon}
                                    disabled={couponApplied || couponLoading}
                                >
                                    {couponApplied
                                        ? "Applied"
                                        : couponLoading
                                        ? "Applying..."
                                        : "Apply"}
                                </Button>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between">
                                <span>Subtotal</span>
                                <strong>₹ {subtotal}</strong>
                            </div>

                            {productDiscountTotal > 0 && (
                                <div className="d-flex justify-content-between text-success">
                                    <span>Product Discount</span>
                                    <strong>- ₹ {productDiscountTotal}</strong>
                                </div>
                            )}

                            {couponDiscount > 0 && (
                                <div className="d-flex justify-content-between text-success">
                                    <span>Coupon Discount</span>
                                    <strong>- ₹ {couponDiscount}</strong>
                                </div>
                            )}

                            <hr />

                            <div className="d-flex justify-content-between fs-5">
                                <strong>Total</strong>
                                <strong>₹ {grandTotal}</strong>
                            </div>

                            {couponApplied && (
                                <small className="text-success">
                                    Coupon applied successfully 🎉
                                </small>
                            )}

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
