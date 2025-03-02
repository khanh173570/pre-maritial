import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Nếu không có token, chuyển hướng về trang đăng nhập
  if (!token) {
    return <Navigate to="/home" />;
  }

  // Nếu role không khớp, chuyển hướng về trang không có quyền truy cập
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  // Nếu đủ điều kiện, render children
  return children;
};

export default AuthGuard;
