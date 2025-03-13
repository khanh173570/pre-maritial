// src/layouts/layoutTherapist/TherapistApp.jsx
import React, { useState } from "react";
import TSideBar from "../../components/componentsTherapist/TSideBar/TSidebar"; // Sidebar for Therapist
import THeader from "../../components/componentsTherapist/THeader/THeader"; // Header for Therapist
import { Outlet } from "react-router-dom";  // Outlet to render specific pages
import "./TherapistApp.css";  // Add custom styles for Therapist layout

const TherapistApp = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="therapist-app">
      <TSideBar openSidebarToggle={openSidebarToggle} toggleSidebar={toggleSidebar} />
      <div className="therapist-content">
        <THeader />
        <div className="content-area">
          <Outlet />  {/* This is where the child components (Dashboard, Schedule, etc.) will be rendered */}
        </div>
      </div>
    </div>
  );
};

export default TherapistApp;
