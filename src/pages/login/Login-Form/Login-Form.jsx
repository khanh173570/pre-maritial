import React, { useState } from "react";
import * as Components from "./Components";
import { createAccount } from "./AccountService";

import Swal from "sweetalert2"; // Import SweetAlert2
import { Checkbox, FormControlLabel } from "@mui/material";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ termsRef }) => {
  const [signIn, setSignIn] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Chuyển hướng dựa trên role
        switch (response.data.user.role) {
          case "customer":
            navigate("/");
            break;
          case "admin":
            navigate("/admin-home");
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

  // const handleTermsClick = (e) => {
  //   e.preventDefault();
  //   termsRef.current.scrollIntoView({ behavior: "smooth" });
  // };

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
                      // onClick={handleTermsClick}
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
