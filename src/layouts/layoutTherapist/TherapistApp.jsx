// import React from 'react';
import { Outlet } from "react-router-dom";
import Header from "../../components/componentsAdmin/componentsHeader/componentsHeader";
import Footer from "../../components/componentsAdmin/componentsFooter/componentsFooter";
function TherapistApp() {
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

export default TherapistApp;
// gom tat ca page
