// import React, { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { TherapistContext } from "../../../contexts/TherapistContext";
// import defaultProfilePicture from "../../../assets/asstetsCustomer/default-profile.jpg"; // Đường dẫn đến ảnh mặc định
// import "./ViewTherapist.css";

// const View_Therapist = () => {
//   const { therapists, majors, fetchTherapists } = useContext(TherapistContext);
//   const [selectedMajor, setSelectedMajor] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchTherapists();
//   }, []);

//   const handleTherapistClick = (therapistId) => {
//     navigate(`/customer-home/view-therapists/schedule/${therapistId}`);
//   };

//   const filteredTherapists = therapists.filter(
//     (t) => !selectedMajor || t.therapistMajorId === Number(selectedMajor)
//   );

//   return (
//     <div>
//       <h2>Danh sách Therapists</h2>

//       {/* Dropdown for selecting major */}
//       <div className="majors-container">
//         <select
//           className="major-select"
//           value={selectedMajor}
//           onChange={(e) => setSelectedMajor(e.target.value)}
//         >
//           <option value="">-- Chọn chuyên ngành --</option>
//           {majors.map((major) => (
//             <option key={major.id} value={major.id}>
//               {major.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Therapist cards */}
//       <div className="therapists-grid">
//         {filteredTherapists.length > 0 ? (
//           filteredTherapists.map((therapist) => (
//             <div
//               key={therapist.userId}
//               className="therapist-card"
//               onClick={() => handleTherapistClick(therapist.userId)}
//             >
//               <img
//                 src={therapist.profilePicture || defaultProfilePicture}
//                 alt={`${therapist.name}'s profile`}
//               />
//               <div className="therapist-details">
//                 <h3>{therapist.name}</h3>
//                 <h4>{therapist.title}</h4>
//                 <p>{therapist.bio}</p>
//                 <div className="contact-info">
//                   <a href={`tel:${therapist.phone}`}>{therapist.phone}</a>
//                   <button
//                     className="email-button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       window.location.href = `mailto:${therapist.email}`;
//                     }}
//                   >
//                     Email Me
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>Không có therapists nào phù hợp.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default View_Therapist;

import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TherapistContext } from "../../../contexts/TherapistContext";
import { getUsers } from "../customerServices"; // Import the getUsers method
import defaultProfilePicture from "../../../assets/asstetsCustomer/default-profile.jpg"; // Path to default profile picture
import "./ViewTherapist.css";

const View_Therapist = () => {
  const { therapists, majors, fetchTherapists } = useContext(TherapistContext);
  const [selectedMajor, setSelectedMajor] = useState("");
  const [users, setUsers] = useState([]); // State to store user details
  const navigate = useNavigate();

  // Fetch therapists and users on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchTherapists(); // Fetch therapists
        const userData = await getUsers(); // Fetch users
        setUsers(userData); // Store users in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTherapistClick = (therapistId) => {
    navigate(`/customer-home/view-therapists/schedule/${therapistId}`);
  };

  const filteredTherapists = therapists.filter(
    (t) => !selectedMajor || t.therapistMajorId === Number(selectedMajor)
  );

  return (
    <div>
      <h2>Danh sách Therapists</h2>

      {/* Dropdown for selecting major */}
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

      {/* Therapist cards */}
      <div className="therapists-grid">
        {filteredTherapists.length > 0 ? (
          filteredTherapists.map((therapist) => {
            const user = users.find((u) => u.id === therapist.userId); // Find user by userId
            const firstName = user?.firstName || "Unknown"; // Fallback for null firstName
            const lastName = user?.lastName || ""; // Fallback for null lastName
            const fullName = `${firstName} ${lastName}`.trim(); // Combine first and last name
            return (
              <div
                key={therapist.userId}
                className="therapist-card"
                onClick={() => handleTherapistClick(therapist.userId)}
              >
                <img
                  src={therapist.profilePicture || defaultProfilePicture}
                  alt={`${fullName}'s profile`}
                />
                <div className="therapist-details">
                  <h3>{fullName}</h3>
                  <h4>{therapist.title}</h4>
                  <p>{therapist.bio}</p>
                  <p>Email: {user?.email || "N/A"}</p>{" "}
                  {/* Fallback for null email */}
                  <div className="contact-info">
                    <a href={`tel:${therapist.phone}`}>{therapist.phone}</a>
                    <button
                      className="email-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `mailto:${user?.email || ""}`;
                      }}
                    >
                      Email Me
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>Không có therapists nào phù hợp.</p>
        )}
      </div>
    </div>
  );
};

export default View_Therapist;
