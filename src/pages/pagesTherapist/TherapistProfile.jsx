import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, TextField, Button, Switch, CircularProgress, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import useAuth from "../../utils/hook/useAuth";

// TherapistProfile.jsx
// This component displays and allows editing of a therapist's profile.
// Currently, it uses mock data (mockTherapists and mockMajors) to simulate the data that would normally come from the API.
// The save functionality is also mocked by updating the local state.
// TODO: For the development team
// 1. Replace the mock data with real API calls using TherapistContext (uncomment the import below).
// 2. Call fetchTherapists() in a useEffect hook to load the therapists data on mount.
// 3. Call fetchMajors() to load the majors data (if not already loaded in TherapistContext).
// 4. In the handleSave function, replace the mock save logic with a call to updateTherapist(therapistId, updatedData).
// See the TODO comment in handleSave for detailed instructions.

// import { TherapistContext } from "../../contexts/TherapistContext";

const TherapistProfile = () => {
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [therapistId, setTherapistId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    bio: "",
    therapistCertificationName: "",
    certificationIssuedBy: "",
    certificationIssueDate: "",
    specialty: "",
    active: true,
    version: 0,
  });

  // Mock data to simulate the therapists and majors data that would normally come from the API
  const mockTherapists = [
    {
      userId: 69, // Matches the user.id from useAuth for testing
      bio: "Hello just testing here",
      therapistCertificationName: "dsadsdasd",
      certificationIssuedBy: "Not set",
      certificationIssueDate: "2025-03-27",
      therapistMajorId: 1,
      active: true,
      version: 0,
    },
  ];

  const mockMajors = [
    { id: 1, name: "Psychology" },
    { id: 2, name: "Counseling" },
  ];

  // Simulate fetching therapists and setting the therapistId
  useEffect(() => {
    // Simulate a delay to mimic API call
    setTimeout(() => {
      const therapists = mockTherapists;
      const majors = mockMajors;

      if (therapists.length > 0 && user) {
        console.log("User:", user);
        console.log("Mock Therapists:", therapists);
        const currentTherapist = therapists.find(
          (therapist) => therapist.userId === user.id
        );
        console.log("Current Therapist:", currentTherapist);
        if (currentTherapist) {
          const major = majors.find((m) => m.id === currentTherapist.therapistMajorId);
          setTherapistId(currentTherapist.userId);
          setProfile({
            bio: currentTherapist.bio || "Not set",
            therapistCertificationName: currentTherapist.therapistCertificationName || "Not set",
            certificationIssuedBy: currentTherapist.certificationIssuedBy || "Not set",
            certificationIssueDate: currentTherapist.certificationIssueDate || "Not set",
            specialty: major ? major.name : "Not set",
            active: currentTherapist.active !== undefined ? currentTherapist.active : true,
            version: currentTherapist.version || 0,
          });
        } else {
          console.log("Current therapist not found!");
        }
      } else {
        console.log("Therapists array is empty or user is not set!");
        console.log("Therapists length:", therapists.length);
        console.log("User:", user);
      }
      setLoading(false);
    }, 1000);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleActiveChange = (e) => {
    setProfile((prev) => ({ ...prev, active: e.target.checked }));
  };

  const handleSave = () => {
    // Validate required fields
    if (!profile.bio || !profile.therapistCertificationName || !profile.specialty) {
      toast.error("Please fill in all required fields (Bio, Certification Name, Specialty).");
      return;
    }

    if (!therapistId) {
      toast.error("Không tìm thấy therapist ID!");
      console.log("Therapist ID is missing!");
      return;
    }

    // Prepare the updated data
    const major = mockMajors.find((m) => m.name === profile.specialty);
    const updatedData = {
      id: therapistId,
      bio: profile.bio,
      therapistCertificationName: profile.therapistCertificationName,
      certificationIssuedBy: profile.certificationIssuedBy,
      certificationIssueDate: profile.certificationIssueDate,
      therapistMajorId: major ? major.id : null,
      active: profile.active,
      version: profile.version,
    };

    console.log("Saving therapist with ID:", therapistId);
    console.log("Updated data:", updatedData);

    // TODO: For the development team
    // Replace this mock save logic with an API call to update the therapist's profile
    // Steps to add the API call:
    // 1. Use the updateTherapist function from TherapistContext (uncomment the import above)
    // 2. Call updateTherapist(therapistId, updatedData) inside a try/catch block
    // 3. Update the mockTherapists array with the response from the API
    // Example:
    /*
    try {
      const updatedTherapist = await updateTherapist(therapistId, updatedData);
      // Update mockTherapists with the new data (or update the state in TherapistContext)
      mockTherapists = mockTherapists.map((therapist) =>
        therapist.userId === therapistId ? updatedTherapist : therapist
      );
      setProfile({
        bio: updatedTherapist.bio || "Not set",
        therapistCertificationName: updatedTherapist.therapistCertificationName || "Not set",
        certificationIssuedBy: updatedTherapist.certificationIssuedBy || "Not set",
        certificationIssueDate: updatedTherapist.certificationIssueDate || "Not set",
        specialty: majors.find((m) => m.id === updatedTherapist.therapistMajorId)?.name || "Not set",
        active: updatedTherapist.active !== undefined ? updatedTherapist.active : true,
        version: updatedTherapist.version || 0,
      });
      setIsEditing(false);
      toast.success("Your changes have been saved!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to save changes. Please try again.");
    }
    */

    // For now, simulate the save by updating the local state
    mockTherapists[0] = { ...mockTherapists[0], ...updatedData, therapistMajorId: major ? major.id : null };
    setProfile({
      bio: updatedData.bio || "Not set",
      therapistCertificationName: updatedData.therapistCertificationName || "Not set",
      certificationIssuedBy: updatedData.certificationIssuedBy || "Not set",
      certificationIssueDate: updatedData.certificationIssueDate || "Not set",
      specialty: major ? major.name : "Not set",
      active: updatedData.active !== undefined ? updatedData.active : true,
      version: updatedData.version || 0,
    });

    setIsEditing(false);
    toast.success("Your changes have been saved!");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

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
              label="Bio"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Certification Name"
              name="therapistCertificationName"
              value={profile.therapistCertificationName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Certification Issued By"
              name="certificationIssuedBy"
              value={profile.certificationIssuedBy}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Certification Issue Date (YYYY-MM-DD)"
              name="certificationIssueDate"
              value={profile.certificationIssueDate}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <FormControl fullWidth required>
              <InputLabel>Specialty</InputLabel>
              <Select
                name="specialty"
                value={profile.specialty}
                onChange={handleChange}
                label="Specialty"
              >
                {mockMajors.map((major) => (
                  <MenuItem key={major.id} value={major.name}>
                    {major.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography>Active:</Typography>
              <Switch
                checked={profile.active}
                onChange={handleActiveChange}
                name="active"
              />
            </Box>
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
            <Typography><strong>Bio:</strong> {profile.bio}</Typography>
            <Typography><strong>Certification Name:</strong> {profile.therapistCertificationName}</Typography>
            <Typography><strong>Certification Issued By:</strong> {profile.certificationIssuedBy}</Typography>
            <Typography><strong>Certification Issue Date:</strong> {profile.certificationIssueDate}</Typography>
            <Typography><strong>Specialty:</strong> {profile.specialty}</Typography>
            <Typography><strong>Active:</strong> {profile.active ? "Yes" : "No"}</Typography>
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