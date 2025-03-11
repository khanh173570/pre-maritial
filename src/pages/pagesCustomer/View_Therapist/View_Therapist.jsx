import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate
import { TherapistContext } from "../../../contexts/TherapistContext";
import "./ViewTherapist.css"; // Import CSS để style grid

const View_Therapist = () => {
  const { therapists, majors, fetchTherapists } = useContext(TherapistContext);
  const [selectedMajor, setSelectedMajor] = useState("");
  const navigate = useNavigate(); // Khai báo useNavigate

  useEffect(() => {
    fetchTherapists();
  }, []);

  // Hàm xử lý khi click vào therapist
  const handleTherapistClick = (therapistId) => {
    navigate(`/customer-home/view-therapists/schedule/${therapistId}`); // Điều hướng đến trang lịch của therapist
  };

  // Lọc therapists theo major đã chọn
  const filteredTherapists = therapists.filter(
    (t) => !selectedMajor || t.therapistMajorId === Number(selectedMajor)
  );

  return (
    <div>
      <h2>Danh sách Therapists</h2>

      {/* Dropdown chọn chuyên ngành */}
      <div className="majors-container">
        <select
          className="major-select"
          value={selectedMajor}
          onChange={(e) => setSelectedMajor(e.target.value)}
        >
          <option value="">-- Chọn chuyên ngành --</option>
          {majors.map((major) => (
            <option key={major.id} value={major.id}>
              {major.name}
            </option>
          ))}
        </select>
      </div>

      {/* Hiển thị danh sách therapists */}
      <div className="therapists-grid">
        {filteredTherapists.length > 0 ? (
          filteredTherapists.map((therapist) => (
            <div
              key={therapist.userId}
              className="therapist-card"
              onClick={() => handleTherapistClick(therapist.userId)} // Thêm sự kiện click
            >
              <p>
                <strong>Bio:</strong> {therapist.bio}
              </p>
              <p>
                <strong>Certification:</strong>{" "}
                {therapist.therapistCertificationName}
              </p>
              <p>
                <strong>Issued By:</strong> {therapist.certificationIssuedBy}
              </p>
              <p>
                <strong>Issue Date:</strong> {therapist.certificationIssueDate}
              </p>
              <p>
                <strong>Expiration Date:</strong>{" "}
                {therapist.certificationExpirationDate}
              </p>
            </div>
          ))
        ) : (
          <p>Không có therapists nào phù hợp.</p>
        )}
      </div>
    </div>
  );
};

export default View_Therapist;
