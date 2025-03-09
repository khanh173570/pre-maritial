import axios from "axios";

const API_URL = "http://54.179.45.72:8080/api/auth"; // Cập nhật API mới

// Hàm lấy danh sách tài khoản (nếu cần)
export const fetchAccounts = async () => {
  try {
    const response = await axios.get(`${API_URL}/login`);
    return response.data;
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
};

// Hàm xác thực đăng nhập
export const validateCredentials = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error validating credentials:", error);
    return null;
  }
};

// Hàm đăng ký tài khoản mới
export const createAccount = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
      roleId: 3, // Mặc định roleId là 3 (customer)
      status: true,
      created_date: new Date().toISOString(),
    });

    return response.data;
  } catch (error) {
    console.error("Error in createAccount API request:", error);
    throw error;
  }
};
