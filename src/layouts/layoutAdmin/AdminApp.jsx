// import React from 'react';
import { Outlet } from "react-router-dom";
import Header from "../../components/componentsAdmin/componentsHeader/ComponentsHeader";
import Footer from "../../components/componentsAdmin/componentsFooter/componentsFooter";
import Sidebar from "../../components/componentsAdmin/SideBar/Sidebar"; // Import Sidebar
import "./AdminApp.css";
import { useState } from "react";

function AdminApp() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const openSideBar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    // <div className="grid-container admin-dashboard">
    <div className="admin-app">
      <Header openSideBar={openSideBar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        openSideBar={openSideBar}
      />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
    // <>
    //   <div className="header">
    //     <Header />
    //   </div>
    //   <div className="main">
    //     <Outlet />
    //   </div>
    // </>
  );
}

export default AdminApp;
// gom tat ca page
