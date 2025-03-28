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

  // Fetch the list of majors
  const fetchMajors = async () => {
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

      const response = await fetch("http://54.179.45.72:8080/therapistMajors", {
        headers,
      });

      if (!response.ok) {
        throw new Error("Error fetching majors");
      }

      const data = await response.json();
      setMajors(data); // Update the majors state
    } catch (error) {
      console.error("Error fetching majors:", error);
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
        `http://54.179.45.72:8080/therapistSchedules?therapistId=${therapistId}&page=1&size=999`,
        { method: "GET", headers }
      );

      // Log the raw response for debugging
      console.log("Raw response:", response);

      // Check if the response is OK and has content
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text(); // Read the response as text
      if (!text) {
        console.warn("Empty response from server.");
        setSchedules([]); // Set schedules to an empty array if the response is empty
        return;
      }
      const data = JSON.parse(text); // Parse the response as JSON
      console.log("Parsed data:", data);
      // const data = await response.json();
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
        fetchMajors,
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

    console.log(
      "Making PUT request to:",
      `http://54.179.45.72:8080/therapists/${userId}`
    );
    console.log("Request headers:", headers);
    console.log("Request body:", updatedData);

    const response = await fetch(
      `http://54.179.45.72:8080/therapists/${userId}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(updatedData),
      }
    ).catch((error) => {
      console.error("Network error during fetch:", error);
      throw new Error("Network error: Unable to reach the server");
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error response:", errorText);
      throw new Error(`Lỗi khi cập nhật thông tin therapist: ${errorText}`);
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
    throw error; // Re-throw the error so handleSave can catch it
  }
};
export default GlobalProvider;
