import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const TherapistContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [therapists, setTherapists] = useState([]);
  const [majors, setMajors] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const getToken = () => localStorage.getItem("token");

  // Lấy danh sách therapists
  const fetchTherapists = async () => {
    try {
      const token = getToken();
      console.log("Token in fetchTherapists:", token); // Add this log
      if (!token) {
        console.log("Token is missing, redirecting to login..."); // Add this log
        navigate("/login");
        return;
      }
  
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
  
      const response = await fetch(
        "http://54.179.45.72:8080/therapists?page=1&size=99",
        { headers }
      );
  
      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu therapists");
      }
  
      const data = await response.json();
      console.log("Therapists data:", data);
      setTherapists(data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu therapists:", error);
      navigate("/login");
    }
  };
  // Lấy lịch trình của therapist theo therapistId
  const fetchTherapistSchedules = async (therapistId) => {
    try {
      const token = getToken();
      if (!token) throw new Error("Không tìm thấy token!");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(
        `http://54.179.45.72:8080/therapistSchedules?therapistId=${therapistId}&page=1&size=10`,
        { method: "GET", headers }
      );

      const data = await response.json();
      const therapistSchedules = data.content.filter(
        (schedule) => schedule.therapistId === therapistId
      );
      setSchedules(therapistSchedules);
    } catch (error) {
      console.error("Lỗi khi lấy lịch trình:", error);
    }
  };

  return (
    <TherapistContext.Provider
      value={{
        therapists,
        majors,
        schedules,
        fetchTherapists,
        fetchTherapistSchedules,
      }}
    >
      {children}
    </TherapistContext.Provider>
  );
};
const updateTherapist = async (userId, updatedData) => {
  try {
    const token = getToken();
    if (!token) {
      console.log("Token is missing, redirecting to login...");
      navigate("/login");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    console.log("Making PUT request to:", `http://54.179.45.72:8080/therapists/${userId}`);
    console.log("Request headers:", headers);
    console.log("Request body:", updatedData);

    const response = await fetch(
      `http://54.179.45.72:8080/therapists/${userId}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(updatedData),
      }
    );

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    if (!response.ok) {
      throw new Error("Lỗi khi cập nhật thông tin therapist");
    }

    const updatedTherapist = await response.json();
    console.log("Updated therapist data:", updatedTherapist);

    setTherapists((prev) =>
      prev.map((therapist) =>
        therapist.userId === userId ? updatedTherapist : therapist
      )
    );
    return updatedTherapist;
  } catch (error) {
    console.error("Error updating therapist:", error);
    navigate("/login");
    throw error;
  }
};
export default GlobalProvider;
