import axios from "axios";

const API_URL = "http://54.179.45.72:8080";
const getAccessToken = () => {
  return localStorage.getItem("token");
};

// Lấy danh sách users
export const getUsers = async () => {
  console.log("token", getAccessToken());
  try {
    const response = await axios.get(`${API_URL}/users?page=1&size=10`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    console.log(response.data.content); // Kiểm tra response
    return response.data.content;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Xóa user
export const deleteUsers = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    console.log(response.data); // Kiểm tra response
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Lấy thông tin user theo ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Cập nhật thông tin user
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
