import React, { useContext, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { TherapistContext } from "../../../contexts/TherapistContext";
import "./ScheduleTherapist.css";
import { updateSchedule, createMoMoPayment } from "../customerServices";

const ScheduleTherapist = () => {
  const { therapistId } = useParams();
  const { schedules, fetchTherapistSchedules } = useContext(TherapistContext);
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to retrieve state
  const { treatmentCost } = location.state || {}; // Get treatmentCost from state

  useEffect(() => {
    fetchTherapistSchedules(Number(therapistId));
  }, [therapistId]);

  const handleBookNow = async (schedule) => {
    try {
      // Extract the treatmentCost directly from the schedule object
      const amount = treatmentCost || 0; // Default to 0 if treatmentCost is not provided

      if (isNaN(amount) || amount <= 0) {
        alert("Invalid treatment cost. Please check the schedule details.");
        return;
      }

      // Update the schedule to mark it as booked
      const { id, ...payload } = schedule;
      payload.isBooked = true; // Mark the schedule as booked

      console.log("Payload being sent to updateSchedule:", payload);

      await updateSchedule(id, payload); // Call the API to update the schedule
      alert("Schedule updated successfully!"); // Notify the user

      // Proceed to create the MoMo payment
      console.log("Amount being sent to createMoMoPayment:", amount);
      const response = await createMoMoPayment(amount);

      console.log("MoMo Payment Response:", response);

      if (response && response.payUrl) {
        // Redirect to the payUrl
        window.location.href = response.payUrl;
      } else {
        alert("Failed to retrieve payment URL. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error booking schedule:",
        error.response?.data || error.message
      );
      alert("Failed to book the schedule. Please try again.");
    }
  };

  return (
    <div className="schedule-container">
      <h2>Lịch trình của Therapist</h2>
      <button onClick={() => navigate(-1)}>Quay lại</button>

      {schedules.length > 0 ? (
        <ul className="schedule-list">
          {schedules.map((schedule) => (
            <li key={schedule.id} className="schedule-item">
              <p>
                <strong>Ngày và Giờ:</strong> {schedule.startTime} -{" "}
                {schedule.endTime}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                {schedule.isBooked ? "Đã được đặt" : "Còn trống"}
              </p>
              {!schedule.isBooked && (
                <button
                  className="book-now-button"
                  onClick={() => handleBookNow(schedule)}
                >
                  Book Now
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Không có lịch trình nào.</p>
      )}
    </div>
  );
};

export default ScheduleTherapist;
