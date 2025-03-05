// import React from 'react';
import { Outlet } from "react-router-dom";
import Header from "../../components/componentsAdmin/componentsHeader/componentsHeader";
import Footer from "../../components/componentsAdmin/componentsFooter/componentsFooter";
function AdminApp() {
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="main">
        <Outlet />
      </div>
    </>
  );
}

export default AdminApp;
// gom tat ca page
