import React, { useContext, useState, useEffect } from "react";
import { TherapistContext } from "../../../contexts/TherapistContext";
import "./ViewTherapist.css"; // Import CSS để style grid

const View_Therapist = () => {
const { therapists, majors, fetchTherapists } = useContext(TherapistContext);
const [selectedMajor, setSelectedMajor] = useState(null);

useEffect(() => {
fetchTherapists();
}, []);

// Lọc therapists theo major đã chọn và chỉ lấy những người có isActive === true
const filteredTherapists = therapists.filter(
(t) =>
// t.isActive === true &&
!selectedMajor || t.therapistMajorId === selectedMajor
);

return (
<div>
<h2>Danh sách Therapists</h2>

      {/* Danh sách majors */}
      <div className="majors-container">
        {majors.map((major) => (
          <button
            style={{ backgroundColor: "black", color: "white" }}
            key={major.id}
            onClick={() => setSelectedMajor(major.id)}
          >
            {major.name}
          </button>
        ))}
      </div>

      {/* Hiển thị therapists theo grid */}
      <div className="therapists-grid">
        {filteredTherapists.length > 0 ? (
          filteredTherapists.map((therapist) => (
            <div key={therapist.userId} className="therapist-card">
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
