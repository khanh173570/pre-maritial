import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTherapistById, updateTherapist } from "./adminServices";

const EditTherapist = () => {
  const { userId } = useParams(); // Get userId from the URL
  const navigate = useNavigate(); // For navigation after saving
  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  // Helper function to convert MM/DD/YYYY to YYYY-MM-DD
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        setLoading(true); // Set loading to true
        const data = await getTherapistById(userId); // Fetch therapist details

        if (!data) {
          throw new Error("Therapist details not found."); // Handle missing data
        }

        // Format the date fields for input type="date"
        data.certificationIssueDate = formatDateForInput(
          data.certificationIssueDate
        );
        data.certificationExpirationDate = formatDateForInput(
          data.certificationExpirationDate
        );
        setTherapist(data);
      } catch (error) {
        console.error("Error fetching therapist details:", error);
        setError("Therapist details not found or unavailable."); // Set error message
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchTherapist();
  }, [userId]);

  const formatDateForAPI = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Construct the payload to match the API requirements
      const payload = {
        bio: therapist.bio || "",
        therapistCertificationName: therapist.therapistCertificationName || "",
        certificationIssuedBy: therapist.certificationIssuedBy || "",
        certificationIssueDate: formatDateForAPI(
          therapist.certificationIssueDate
        ),
        certificationExpirationDate: formatDateForAPI(
          therapist.certificationExpirationDate
        ),
        therapistMajorId: therapist.therapistMajorId || 0, // Default to 0 if not provided
        isActive: therapist.isActive !== undefined ? therapist.isActive : true, // Default to true
      };

      console.log("Payload being sent to API:", payload); // Log the payload for debugging

      // Call the API to update the therapist
      await updateTherapist(userId, payload);

      alert("Therapist information updated successfully!");
      navigate("/view-therapists"); // Redirect to the therapist list page
    } catch (error) {
      console.error("Error updating therapist:", error);
      if (error.response) {
        console.error("Server response:", error.response.data); // Log server response
        alert(
          `Failed to update therapist: ${
            error.response.data.message || "Unknown error"
          }`
        );
      } else {
        alert("Failed to update therapist information.");
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>; // Display loading message
  }

  if (error) {
    return (
      <div className="text-center mt-4 text-danger">
        {error}
        <br />
        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate("/view-therapists")} // Navigate back to the therapist list
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!therapist) {
    return (
      <div className="text-center mt-4">
        Therapist details not found.
        <br />
        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate("/view-therapists")} // Navigate back to the therapist list
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>Edit Therapist</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Bio</label>
          <textarea
            className="form-control"
            value={therapist.bio || ""}
            onChange={(e) =>
              setTherapist({ ...therapist, bio: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Certification Name</label>
          <input
            type="text"
            className="form-control"
            value={therapist.therapistCertificationName || ""}
            onChange={(e) =>
              setTherapist({
                ...therapist,
                therapistCertificationName: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <label>Issued By</label>
          <input
            type="text"
            className="form-control"
            value={therapist.certificationIssuedBy || ""}
            onChange={(e) =>
              setTherapist({
                ...therapist,
                certificationIssuedBy: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <label>Issued Date</label>
          <input
            type="date"
            className="form-control"
            value={therapist.certificationIssueDate || ""}
            onChange={(e) =>
              setTherapist({
                ...therapist,
                certificationIssueDate: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <label>Expiration Date</label>
          <input
            type="date"
            className="form-control"
            value={therapist.certificationExpirationDate || ""}
            onChange={(e) =>
              setTherapist({
                ...therapist,
                certificationExpirationDate: e.target.value,
              })
            }
          />
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success mt-2">
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-danger mt-2"
            onClick={() => navigate("/view-therapists")} // Navigate back to the therapist list
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTherapist;
