import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async () => {
    const res = await dispatch(registerUser(form));
    console.log(res);
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Registered Successfully");
      navigate("/login");
    } else {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-5 mx-auto">
          <div className="login-bg ">
            <div className="card p-4 shadow login-card">
              <h4 className="text-center mb-3">Register</h4>

              {["name", "email", "phone"].map((f) => (
                <input
                  key={f}
                  className="form-control mb-2"
                  placeholder={f}
                  onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                />
              ))}

              <input
                type="password"
                className="form-control mb-2"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Confirm Password"
                onChange={(e) =>
                  setForm({ ...form, password_confirmation: e.target.value })
                }
              />

              <button className="btn btn-dark w-100" onClick={submit}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
