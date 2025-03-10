import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Đổi tên để phù hợp

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        switch (response.data.user.role) {
          case "customer":
            navigate("/");
            break;
          case "admin":
            navigate("/admin-test");
            break;
          case "therapist":
            navigate("/therapist-home");
            break;
          default:
            setError("Role không hợp lệ");
        }
      } else {
        setError("Đăng nhập thất bại");
      }
    } catch (err) {
      setError("Lỗi kết nối đến server");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        { username, email, password }
      );

      if (response.data.success) {
        alert("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
        setIsLogin(true);
      } else {
        setError("Đăng ký thất bại, thử lại.");
      }
    } catch (err) {
      setError("Lỗi kết nối đến server.");
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-box ${isLogin ? "login-mode" : "signup-mode"}`}>
        <div className="slider"></div>

        <div className="form-container login-form">
          <h2>Đăng nhập</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Đăng nhập</button>
          </form>
          <p>
            Chưa có tài khoản?{" "}
            <span onClick={() => setIsLogin(false)}>Đăng ký</span>
          </p>
        </div>

        <div className="form-container signup-form">
          <h2>Đăng ký</h2>
          <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Đăng ký</button>
          </form>
          <p>
            Đã có tài khoản?{" "}
            <span onClick={() => setIsLogin(true)}>Đăng nhập</span>
          </p>
        </div>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Auth;
