import React, { createContext, useState } from "react";

export const TherapistContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [therapists, setTherapists] = useState([]);
  const [majors, setMajors] = useState([]);

  // Hàm lấy token từ localStorage
  const getToken = () => localStorage.getItem("token");

  // Admin sẽ gọi API và lưu vào context
  const fetchTherapists = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Không tìm thấy token!");
      }

      // Header chung cho các request
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const resMajors = await fetch(
        "http://54.179.45.72:8080/therapistMajors?page=1&size=5",
        { method: "GET", headers }
      );
      const dataMajors = await resMajors.json();
      setMajors(dataMajors.content);

      const resTherapists = await fetch(
        "http://54.179.45.72:8080/therapists?page=1&size=5",
        { method: "GET", headers }
      );
      const dataTherapists = await resTherapists.json();
      setTherapists(dataTherapists.content);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu therapists:", error);
    }
  };

  return (
    <TherapistContext.Provider value={{ therapists, majors, fetchTherapists }}>
      {children}
    </TherapistContext.Provider>
  );
};

export default GlobalProvider;
