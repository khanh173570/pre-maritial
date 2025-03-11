import React, { useContext, useState, useEffect } from "react";
import { TherapistContext } from "../../../contexts/TherapistContext";

const View_Therapist = () => {
  const { therapists, majors, fetchTherapists } = useContext(TherapistContext);

  useEffect(() => {
    fetchTherapists();
  }, []);

  const [selectedMajor, setSelectedMajor] = useState(null);

  // Hiển thị tất cả therapists nếu chưa chọn major
  const filteredTherapists = selectedMajor
    ? therapists.filter((t) => t.therapistMajorId === selectedMajor)
    : therapists;

  return (
    <div>
      <h2>Danh sách Therapists</h2>

      {/* Danh sách majors */}
      <div>
        <button onClick={() => setSelectedMajor(null)}>Tất cả</button>
        {majors.map((major) => (
          <button key={major.id} onClick={() => setSelectedMajor(major.id)}>
            {major.name}
          </button>
        ))}
      </div>

      {/* Hiển thị therapists theo major */}
      <ul>
        {filteredTherapists.map((therapist) => (
          <li key={therapist.userId}>
            {therapist.bio} - {therapist.therapistCertificationName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default View_Therapist;
