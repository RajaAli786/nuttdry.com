import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, Button, Form } from "react-bootstrap";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigate("/dashboard"); 
    }
  }, [user, navigate]);

  const submit = async () => {
    const res = await dispatch(loginUser(form));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Login Successful");
      const redirectTo = location.state?.redirect || "/dashboard";
      navigate(redirectTo);
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#f8f9fa" }}
    >
      <Card className="shadow-lg border-0" style={{ width: "380px" }}>
        <Card.Body className="p-4">
          <h4 className="text-center fw-bold mb-3">Welcome Back 👋</h4>
          <p className="text-center text-muted mb-4">
            Login to continue shopping
          </p>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </Form.Group>

            <Button
              variant="dark"
              className="w-100 mt-2"
              onClick={submit}
            >
              Login
            </Button>
          </Form>

          <div className="text-center mt-3">
            <small>
              New user?{" "}
              <Link to="/register" className="fw-semibold">
                Create an account
              </Link>
            </small>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
