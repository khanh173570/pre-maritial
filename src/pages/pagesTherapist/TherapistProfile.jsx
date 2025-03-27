import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import useAuth from "../../utils/hook/useAuth";
import { TherapistContext } from "../../contexts/TherapistContext";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";

const TherapistProfile = () => {
  const { user } = useAuth();
  const { therapists, fetchTherapists, updateTherapist, majors } = useContext(TherapistContext);

  const [isEditing, setIsEditing] = useState(false);
  const [therapistId, setTherapistId] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    credentials: "",
    specialty: "",
    availability: "",
  });

  useEffect(() => {
    fetchTherapists();
  }, []);
  
  useEffect(() => {
    if (therapists.length > 0 && user) {
      console.log("User:", user);
      console.log("Therapists:", therapists);
      const currentTherapist = therapists.find(
        (therapist) => therapist.userId === user.id
      );
      console.log("Current Therapist:", currentTherapist);
      if (currentTherapist) {
        const major = majors.find((m) => m.id === currentTherapist.therapistMajorId);
        setTherapistId(currentTherapist.userId);
        setProfile({
          name: currentTherapist.bio || "Not set",
          credentials: currentTherapist.therapistCertificationName || "Not set",
          specialty: major ? major.name : "Not set",
        });
      } else {
        console.log("Current therapist not found!");
      }
    } else {
      console.log("Therapists array is empty or user is not set!");
      console.log("Therapists length:", therapists.length);
      console.log("User:", user);
    }
  }, [therapists, user, majors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (!therapistId) {
        toast.error("Không tìm thấy therapist ID!");
        console.log("Therapist ID is missing!");
        return;
      }
  
      const major = majors.find((m) => m.name === profile.specialty);
      const updatedData = {
        bio: profile.name,
        therapistCertificationName: profile.credentials,
        therapistMajorId: major ? major.id : null,
      };
  
      console.log("Saving therapist with ID:", therapistId);
      console.log("Updated data:", updatedData);
  
      await updateTherapist(therapistId, updatedData);
      setIsEditing(false); // Exit edit mode after successful save
      toast.success("Your changes have been saved!"); // Show success message
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to save changes. Please try again."); // Show error message
      // Do not set isEditing to false, so the user can try again
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Chào mừng, {user?.username}!
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
        <Typography variant="h5" gutterBottom>
          My Profile
        </Typography>
        {isEditing ? (
          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Credentials"
              name="credentials"
              value={profile.credentials}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Specialty"
              name="specialty"
              value={profile.specialty}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Availability"
              name="availability"
              value={profile.availability}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography><strong>Name:</strong> {profile.name}</Typography>
            <Typography><strong>Credentials:</strong> {profile.credentials}</Typography>
            <Typography><strong>Specialty:</strong> {profile.specialty}</Typography>
            <Typography><strong>Availability:</strong> {profile.availability}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
              sx={{ marginTop: 2, width: "fit-content" }}
            >
              Edit Profile
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default TherapistProfile;