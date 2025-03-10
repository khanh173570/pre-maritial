import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../utils/hook/useAuth";
import { logout } from "../../contexts/AuthContext/reducer";

const Page01 = () => {
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
      <p>Bạn đang ở trang dành cho Admin test.</p>
      <button onClick={handleLogout}>Đăng xuất</button>
      <button onClick={() => navigate("/admin-home")}>admin home</button>
    </div>
  );
};

export default Page01;

//CRUD therapist
