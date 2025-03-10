import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../utils/hook/useAuth";
import { logout } from "../../contexts/AuthContext/reducer";

const AdminHome = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useAuth();

  const handleLogout = () => {
    // Xóa thông tin user và token khỏi localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Gọi action logout
    if (dispatch) {
      dispatch(logout());
    }

    // Hiển thị thông báo
    toast.success("Logout successful!");

    // Chuyển hướng về trang đăng nhập
    navigate("/login");
  };

  return (
    <div>
      <h1>Chào mừng, {user?.username}!</h1>
      <p>Bạn đang ở trang dành cho Admin.</p>
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
};

export default AdminHome;

//CRUD therapist
