import axios from "axios";

const API_URL = "http://54.179.45.72:8080/api/auth"; // Cập nhật API mới

// Tạo một instance của axios với headers mặc định
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // Lấy token từ localStorage nếu có
  },
});

// Hàm đăng ký tài khoản mới
export const createAccount = async (name, email, password, roleId) => {
  try {
    const isActive = roleId === 2 ? "false" : "true";

    const response = await apiClient.post("/register", {
      name,
      email,
      password,
      roleId,
      isActive,
    });

    return response.data;
  } catch (error) {
    console.error("Error in createAccount API request:", error);
    throw error;
  }
};
