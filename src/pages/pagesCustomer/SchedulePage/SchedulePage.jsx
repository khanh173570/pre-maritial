import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SchedulePage = () => {
  const { therapistId } = useParams();
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetch(
      `http://54.179.45.72:8080/therapistSchedules?therapistId=${therapistId}`
    )
      .then((response) => response.json())
      .then((data) => setSchedule(data.content))
      .catch((error) => console.error("Lỗi khi lấy lịch trình:", error));
  }, [therapistId]);

  return (
    <div>
      <h2>Lịch Trình của Therapist</h2>
      {schedule.length > 0 ? (
        <ul>
          {schedule.map((slot) => (
            <li
              key={slot.id}
              style={{ color: slot.isBooked ? "red" : "green" }}
            >
              {slot.availableDate} - {slot.startTime} đến {slot.endTime}{" "}
              {slot.isBooked ? "(Đã book)" : "(Chưa book)"}
            </li>
          ))}
        </ul>
      ) : (
        <p>Không có lịch trình nào.</p>
      )}
    </div>
  );
};

export default SchedulePage;
