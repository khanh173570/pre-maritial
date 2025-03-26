import { Outlet } from "react-router-dom";
import TherapistHeader from "../../components/componentsTherapist/TherapistHeader";
import TherapistSidebar from "../../components/componentsTherapist/TherapistSidebar";
import { Box } from "@mui/material"; // Add this import

function TherapistApp() {
  return (
    <Box sx={{ display: "flex" }}>
      <TherapistSidebar />
      <Box sx={{ flexGrow: 1, marginLeft: "250px" }}>
        <TherapistHeader />
        <Box sx={{ padding: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default TherapistApp;