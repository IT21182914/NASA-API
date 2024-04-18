import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/index";
import "./LoginForm.css";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    passwordError: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      if (value.length < 6) {
        setErrors({
          ...errors,
          passwordError: "Password must have at least 6 characters",
        });
      } else {
        setErrors({
          ...errors,
          passwordError: "",
        });
      }
    }
  };

  const handleFocus = (e) => {
    e.target.parentElement.classList.add("active");
  };

  const handleBlur = (e) => {
    if (!e.target.value.trim()) {
      e.target.parentElement.classList.remove("active");
    }
  };

  const sendRequest = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );
      const data = await res.data;
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await sendRequest(formData);
      dispatch(authAction.login());
      console.log(userData);
      setSuccessMessage("Login successful!");
      navigate("/mars");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLabelClick = (e) => {
    const inputId = e.target.htmlFor;
    document.getElementById(inputId).focus();
  };

  return (
    <div className="login-form-container">
      <div className="login-form">
        <div className="logo">NASA</div>
        <h2>Login</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="column">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={formData.email ? "active" : ""}
                required
              />
              <label htmlFor="email" onClick={handleLabelClick}>
                Email
              </label>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={formData.password ? "active" : ""}
                required
              />
              <label htmlFor="password" onClick={handleLabelClick}>
                Password
              </label>
              {errors.passwordError && (
                <span className="error">{errors.passwordError}</span>
              )}
            </div>
          </div>
          <button type="submit" className="submit-button">
            SIGN IN
          </button>
        </form>

        <p className="register-link">
          Don't have an account?{" "}
          <Link
            to="/registration"
            style={{ textDecoration: "underline", color: "#58b9ff" }}
          >
            <span style={{ textDecoration: "none" }}>Create an account</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
