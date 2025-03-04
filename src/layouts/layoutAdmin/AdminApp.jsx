import { Outlet } from "react-router-dom";
import "./AdminApp.css";
import Header from "../../components/componentsAdmin/componentsHeader/componentsHeader.jsx";
import Sidebar from "../../components/componentsAdmin/SideBar/Sidebar.jsx";
import Dashboard from "../../components/componentsAdmin/Dashboard/Dashboard.jsx";
import { useState } from "react";

function AdminApp() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const openSideBar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container admin-dashboard">
      <Header openSideBar={openSideBar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        openSideBar={openSideBar}
      />
      <Outlet />
    </div>
  );
}

export default AdminApp;
