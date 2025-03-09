import React, { useState } from "react";
import * as Components from "./Components";
import { createAccount } from "./AccountService";

import Swal from "sweetalert2"; // Import SweetAlert2
import { Checkbox, FormControlLabel } from "@mui/material";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../../utils/validation/valAdd.js";

const Login = () => {
  const [signIn, setSignIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu email hoặc password bị trống
    if (!email.trim() || !password.trim()) {
      Swal.fire({
        icon: "error",
        title: "Lỗi đăng nhập",
        text: "Vui lòng nhập email và mật khẩu!",
      });
      return; // Dừng thực hiện hàm nếu có trường trống
    }

    // Kiểm tra email hợp lệ trước khi gửi request
    if (!validateEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Email không hợp lệ",
        text: "Vui lòng nhập địa chỉ Gmail hợp lệ (14-26 ký tự).",
      });
      return;
    }

    // Kiểm tra mật khẩu có tối thiểu 6 ký tự
    if (password.length < 3) {
      Swal.fire({
        icon: "error",
        title: "Mật khẩu không hợp lệ",
        text: "Mật khẩu phải có ít nhất 6 ký tự.",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Chuyển hướng dựa trên role
        switch (response.data.user.role) {
          case "customer":
            navigate("/customer-home");
            break;
          case "admin":
            navigate("/admin-home");
            break;
          case "therapist":
            navigate("/therapist-home");
            break;
          default:
            Swal.fire({
              icon: "error",
              title: "Lỗi",
              text: "Role không hợp lệ!",
            });
        }
      }
    } catch (err) {
      if (err.response) {
        // Xử lý lỗi từ server (HTTP 400, 401, 403, ...)
        if (err.response.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Sai tài khoản hoặc mật khẩu",
            text: "Vui lòng kiểm tra lại thông tin đăng nhập!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: err.response.data.message || "Đã có lỗi xảy ra!",
          });
        }
      } else if (err.request) {
        // Không nhận được phản hồi từ server (lỗi mạng)
        Swal.fire({
          icon: "error",
          title: "Lỗi kết nối",
          text: "Không thể kết nối đến server. Vui lòng thử lại!",
        });
      } else {
        // Lỗi khác (ví dụ: lỗi code JS)
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Có lỗi xảy ra. Vui lòng thử lại!",
        });
      }
    }
  };

  const handleSignUp = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Check if all fields are filled out
    if (!username || !email || !password || !confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all the inputs.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const user = await createAccount(username, email, password);
      if (user) {
        Swal.fire({
          icon: "success",
          title: "Sign Up Successful",
          timer: 1500,
        });
        setUsername("");
        setEmail("");

        setPassword("");
        setConfirmPassword("");
        setIsChecked(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again.",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="login-container">
        <Components.Container>
          <Components.SignUpContainer $signinIn={signIn}>
            <Components.Form>
              <Components.Title>Create Account</Components.Title>
              <Components.Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Components.Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Components.Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Components.Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                }
                label={
                  <>
                    I agree to the{" "}
                    <Link
                      type="button"
                      style={{ color: "#ff416c", textDecoration: "underline" }}
                    >
                      terms of service
                    </Link>
                  </>
                }
              />
              <Components.Button type="button" onClick={handleSignUp}>
                Sign Up
              </Components.Button>
            </Components.Form>
          </Components.SignUpContainer>

          <Components.SignInContainer $signinIn={signIn}>
            <Components.Form>
              <Components.Title>Sign in</Components.Title>
              <Components.Input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Components.Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Components.Anchor href="#">
                Forgot your password?
              </Components.Anchor>
              <Components.Button type="button" onClick={handleLogin}>
                Sign in
              </Components.Button>
            </Components.Form>
          </Components.SignInContainer>

          <Components.OverlayContainer $signinIn={signIn}>
            <Components.Overlay $signinIn={signIn}>
              <Components.LeftOverlayPanel $signinIn={signIn}>
                <Components.Title>Welcome Back!</Components.Title>
                <Components.Paragraph>
                  To keep connected with us please login with your personal info
                </Components.Paragraph>
                <Components.GhostButton onClick={() => setSignIn(true)}>
                  Sign In
                </Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel $signinIn={signIn}>
                <Components.Title>Hello, Friend!</Components.Title>
                <Components.Paragraph>
                  Enter Your personal details and start journey with us
                </Components.Paragraph>
                <Components.GhostButton onClick={() => setSignIn(false)}>
                  Sign Up
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
      </div>
    </>
  );
};

export default Login;
