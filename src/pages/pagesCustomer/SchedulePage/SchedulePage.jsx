import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TherapistContext } from "../../../contexts/TherapistContext";
import "./ScheduleTherapist.css";
import { updateSchedule } from "../customerServices";

const ScheduleTherapist = () => {
  const { therapistId } = useParams();
  const { schedules, fetchTherapistSchedules } = useContext(TherapistContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTherapistSchedules(Number(therapistId));
  }, [therapistId]);

  const handleBookNow = async (schedule) => {
    // Exclude the `id` field from the payload
    const { id, ...payload } = schedule;
    payload.isBooked = true; // Update isBooked to true

    console.log("Payload being sent to updateSchedule:", payload);

    try {
      await updateSchedule(id, payload); // Call the API to update the schedule
      alert("Booking successful!"); // Notify the user
      fetchTherapistSchedules(Number(therapistId)); // Refresh the schedules after booking
    } catch (error) {
      console.error("Error booking schedule:", error);
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
