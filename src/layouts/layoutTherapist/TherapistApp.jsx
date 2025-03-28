import { Outlet } from "react-router-dom";
import TherapistHeader from "../../components/componentsTherapist/TherapistHeader";
import TherapistSidebar from "../../components/componentsTherapist/TherapistSidebar";
import { Box } from "@mui/material";

function TherapistApp() {
  return (
    <Box sx={{ display: "flex" }}>
      <TherapistSidebar />
      <Box sx={{ flexGrow: 1 }}>
        <TherapistHeader />
        <Box sx={{ padding: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default TherapistApp;