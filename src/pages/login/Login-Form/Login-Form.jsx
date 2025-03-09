import React, { useState } from "react";
import * as Components from "./Components";
import { createAccount } from "./AccountService";
import Swal from "sweetalert2";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { validateEmail } from "../../../utils/validation/valAdd.js";
import { CUSTOMER, ADMIN, THERAPIST } from "../../../utils/constants/role";

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

    if (!email.trim() || !password.trim()) {
      Swal.fire({
        icon: "error",
        title: "Lỗi đăng nhập",
        text: "Vui lòng nhập email và mật khẩu!",
      });
      return;
    }

    if (!validateEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Email không hợp lệ",
        text: "Vui lòng nhập địa chỉ Gmail hợp lệ (14-26 ký tự).",
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Mật khẩu không hợp lệ",
        text: "Mật khẩu phải có ít nhất 6 ký tự.",
      });
      return;
    }

    // Kiểm tra dữ liệu trước khi gửi
    console.log("Gửi yêu cầu đăng nhập với:", { email, password });

    try {
      const response = await axios.post(
        "http://54.179.45.72:8080/api/auth/login",
        { email, password }
      );

      console.log("Phản hồi từ server:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.userDto)); // Lưu user vào localStorage

        console.log("Token đã lưu:", localStorage.getItem("token"));
        console.log("User đã lưu:", localStorage.getItem("user"));

        // switch (String(response.data.userDto.roleId)) {
        //   case ADMIN:
        //     navigate("/admin-home");
        //     break;
        //   case THERAPIST:
        //     navigate("/therapist-home");
        //     break;
        //   case CUSTOMER:
        //     navigate("/customer-home");
        //     break;
        //   default:
        //     Swal.fire({
        //       icon: "error",
        //       title: "Lỗi",
        //       text: "Role không hợp lệ!",
        //     });
        // }
        switch (response.data.userDto.roleId) {
          case ADMIN:
            navigate("/admin-home");
            break;
          case THERAPIST:
            navigate("/therapist-home");
            break;
          case CUSTOMER:
            navigate("/customer-home");
            break;
          default:
            Swal.fire({
              icon: "error",
              title: "Lỗi",
              text: "Role không hợp lệ!",
            });
        }
      } else {
        console.error("Phản hồi từ server không có token!");
      }
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);

      if (err.response) {
        const { status, data } = err.response;
        let errorMessage = data?.message || "Đã có lỗi xảy ra!";

        // Bắt lỗi HTTP 4xx
        switch (status) {
          case 400:
            errorMessage = "Yêu cầu không hợp lệ! Vui lòng kiểm tra lại.";
            break;
          case 401:
            errorMessage = "Sai email hoặc mật khẩu!";
            break;
          case 403:
            errorMessage = "Bạn không có quyền truy cập!";
            break;
          case 404:
            errorMessage = "Tài khoản không tồn tại!";
            break;
          case 409:
            errorMessage = "Tài khoản đã tồn tại hoặc có xung đột dữ liệu!";
            break;
        }

        Swal.fire({
          icon: "error",
          title: "Lỗi đăng nhập",
          text: errorMessage,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Lỗi kết nối",
          text: "Không thể kết nối đến máy chủ! Vui lòng thử lại.",
        });
      }
    }
  };

  const handleSignUp = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!username || !email || !password || !confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all the inputs.",
      });
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Passwords do not match!",
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
        setSignIn(true); // Chuyển về màn hình đăng nhập sau khi đăng ký thành công
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
    <div className="login-container">
      <Components.Container>
        {/* Sign Up Form */}
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

        {/* Sign In Form */}
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

        {/* Overlay */}
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
                Enter Your personal details and start your journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => setSignIn(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
};

export default Login;
