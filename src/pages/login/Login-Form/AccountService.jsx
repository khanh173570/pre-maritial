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

// Hàm lấy danh sách tài khoản (nếu cần)
export const fetchAccounts = async () => {
  try {
    const response = await apiClient.get("/login");
    return response.data;
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
};

// Hàm xác thực đăng nhập
export const validateCredentials = async (email, password) => {
  try {
    const response = await apiClient.post("/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Error validating credentials:", error);
    return null;
  }
};

// Hàm đăng ký tài khoản mới
export const createAccount = async (name, email, password, roleId) => {
  try {
    const response = await apiClient.post("/register", {
      name,
      email,
      password,
      roleId,
    });

    return response.data;
  } catch (error) {
    console.error("Error in createAccount API request:", error);
    throw error;
  }
};
