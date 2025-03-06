import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = ({ requiredRole }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Nếu không có token hoặc không có user, chuyển hướng về login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có role yêu cầu mà không khớp, chuyển hướng về unauthorized
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Nếu hợp lệ, cho phép truy cập các trang con
  return <Outlet />;
};

export default AuthGuard;
