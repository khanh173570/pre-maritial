import React, { createContext, useState } from "react";

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
      if (!token) throw new Error("Không tìm thấy token!");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const resMajors = await fetch(
        "http://54.179.45.72:8080/therapistMajors?page=1&size=99",
        { method: "GET", headers }
      );
      const dataMajors = await resMajors.json();
      setMajors(dataMajors.content);

      const resTherapists = await fetch(
        "http://54.179.45.72:8080/therapists?page=1&size=99",
        { method: "GET", headers }
      );
      const dataTherapists = await resTherapists.json();
      setTherapists(dataTherapists.content);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu therapists:", error);
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

export default GlobalProvider;
