import React from "react";

const ProfileCustomer = () => {
  // Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));

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
    </div>
  );
};

export default ProfileCustomer;
