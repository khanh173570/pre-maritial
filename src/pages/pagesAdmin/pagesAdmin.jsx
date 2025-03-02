import React from "react";

const AdminHome = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>Chào mừng, {user.username}!</h1>
      <p>Bạn đang ở trang dành cho Admin.</p>
    </div>
  );
};

export default AdminHome;
