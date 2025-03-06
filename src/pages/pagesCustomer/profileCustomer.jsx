import React from "react";
import { Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import HomePage from "./homePage/HomePage";
const ProfileCustomer = () => {
  // Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  // Kiểm tra nếu không có thông tin người dùng, chuyển hướng đến trang đăng nhập
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile-container">
      <h1>Thông tin cá nhân</h1>
      <div className="profile-info">
        <p>
          <strong>Tên người dùng:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      <Button onClick={() => navigate(-1)}>Trở lại</Button>
    </div>
  );
};

export default ProfileCustomer;
