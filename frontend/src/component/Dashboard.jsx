import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "./common/Layout";
import api from "../api/http";
import { logout } from "../redux/authSlice";
import {
  Button,
  Table,
  Card,
  Badge,
  Row,
  Col,
  Spinner,
  Nav,
  Tab,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Status mapping
  const statusMap = {
    1: { text: "Pending", color: "warning" },
    2: { text: "Processing", color: "info" },
    3: { text: "Completed", color: "success" },
    pending: { text: "Pending", color: "warning" },
    processing: { text: "Processing", color: "info" },
    completed: { text: "Completed", color: "success" },
  };

  const paymentMap = {
    pending: { text: "Pending", color: "warning" },
    paid: { text: "Paid", color: "success" },
    success: { text: "Success", color: "success" },
    failed: { text: "Failed", color: "danger" },
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        const formattedOrders = res.data.data.map((order) => ({
          ...order,
          status:
            order.status === 1
              ? "pending"
              : order.status === 2
              ? "processing"
              : order.status === 3
              ? "completed"
              : order.status,
          payment_status: order.payment_status?.toLowerCase() || "pending",
        }));
        setOrders(formattedOrders);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    setTimeout(() => {
        navigate("/"); 
      }, 100);
  };

  // Filter recent orders (last 5)
  const recentOrders = [...orders].slice(0, 5);

  return (
    <Layout>
      <div className="container py-5">
        <h2 className="mb-4 text-center text-dark">User Dashboard</h2>

        <Tab.Container defaultActiveKey="profile">
          <Row>
            {/* Sidebar Tabs */}
            <Col md={3}>
              <Card className="shadow-sm border-0 mb-4">
                <Card.Body>
                  <Nav variant="pills" className="flex-column gap-2">
                    <Nav.Item>
                      <Nav.Link eventKey="profile">Profile</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="allOrders">All Orders</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="recentOrders">Recent Orders</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Button
                        variant="danger"
                        className="mt-3 w-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </Nav.Item>
                  </Nav>
                </Card.Body>
              </Card>
            </Col>

            {/* Main Content */}
            <Col md={9}>
              <Tab.Content>
                {/* ===== PROFILE ===== */}
                <Tab.Pane eventKey="profile">
                  <Card className="shadow-sm border-0 mb-4">
                    <Card.Body>
                      <h4 className="mb-3">Profile Information</h4>
                      <p>
                        <strong>Name:</strong> {user?.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {user?.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {user?.phone}
                      </p>
                      <p>
                        <strong>Address:</strong> {user?.address || "Not provided"}
                      </p>
                    </Card.Body>
                  </Card>
                </Tab.Pane>

                {/* ===== ALL ORDERS ===== */}
                <Tab.Pane eventKey="allOrders">
                  <Card className="shadow-sm border-0 mb-4">
                    <Card.Body>
                      <h4 className="mb-3">All Orders</h4>
                      {loading ? (
                        <div className="text-center py-4">
                          <Spinner animation="border" variant="primary" />
                        </div>
                      ) : orders.length === 0 ? (
                        <p>No orders found.</p>
                      ) : (
                        <Table striped hover responsive>
                          <thead className="table-dark">
                            <tr>
                              <th>#</th>
                              <th>Order #</th>
                              <th>Total</th>
                              <th>Status</th>
                              <th>Payment</th>
                              <th>Items</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((order, idx) => (
                              <tr key={order.id}>
                                <td>{idx + 1}</td>
                                <td>{order.order_number}</td>
                                <td>₹ {order.grand_total}</td>
                                <td>
                                  <Badge
                                    bg={statusMap[order.status]?.color || "secondary"}
                                    className="text-uppercase"
                                  >
                                    {statusMap[order.status]?.text || "Unknown"}
                                  </Badge>
                                </td>
                                <td>
                                  <Badge
                                    bg={paymentMap[order.payment_status]?.color || "secondary"}
                                    className="text-uppercase"
                                  >
                                    {paymentMap[order.payment_status]?.text || "Unknown"}
                                  </Badge>
                                </td>
                                <td>
                                  <ul className="mb-0">
                                    {order.items.map((item) => (
                                      <li key={item.id}>
                                        {item.product_name} × {item.qty} = ₹ {item.price * item.qty}
                                      </li>
                                    ))}
                                  </ul>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      )}
                    </Card.Body>
                  </Card>
                </Tab.Pane>

                {/* ===== RECENT ORDERS ===== */}
                <Tab.Pane eventKey="recentOrders">
                  <Card className="shadow-sm border-0 mb-4">
                    <Card.Body>
                      <h4 className="mb-3">Recent Orders</h4>
                      {loading ? (
                        <div className="text-center py-4">
                          <Spinner animation="border" variant="primary" />
                        </div>
                      ) : recentOrders.length === 0 ? (
                        <p>No recent orders.</p>
                      ) : (
                        <Table striped hover responsive>
                          <thead className="table-light">
                            <tr>
                              <th>Order #</th>
                              <th>Total</th>
                              <th>Status</th>
                              <th>Payment</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentOrders.map((order) => (
                              <tr key={order.id}>
                                <td>{order.order_number}</td>
                                <td>₹ {order.grand_total}</td>
                                <td>
                                  <Badge
                                    bg={statusMap[order.status]?.color || "secondary"}
                                    className="text-uppercase"
                                  >
                                    {statusMap[order.status]?.text || "Unknown"}
                                  </Badge>
                                </td>
                                <td>
                                  <Badge
                                    bg={paymentMap[order.payment_status]?.color || "secondary"}
                                    className="text-uppercase"
                                  >
                                    {paymentMap[order.payment_status]?.text || "Unknown"}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      )}
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </Layout>
  );
};

export default Dashboard;
