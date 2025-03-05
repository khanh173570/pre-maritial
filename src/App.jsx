import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Unauthorized from "./pages/Unauthorized";
import AuthGuard from "./auth/AuthGuard";
// import CustomerGuard from "./auth/CustomerGuard";
import { CustomerGuard } from "./auth/CustomerGuard";

import HomePage from "./pages/pagesCustomer/homePage/HomePage";
import CustomerApp from "./layouts/layoutCustomer/CustomerApp";
import AdminApp from "./layouts/layoutAdmin/AdminApp";
import Dashboard from "./components/componentsAdmin/Dashboard/Dashboard";
import TherapistApp from "./layouts/layoutTherapist/TherapistApp";
import ProfileCustomer from "./pages/pagesCustomer/profileCustomer";
import DetailPage from "./pages/pagesCustomer/homePage/DetailPage";
import Getting_Ready_Marriage from "./pages/pagesCustomer/Getting_Ready_Marriage";
import Great_Marriage_Vows from "./pages/pagesCustomer/Great_Marriage_Vows";
import Pre_MarriageAdvice from "./pages/pagesCustomer/Pre_MarriageAdvice";
import Marriage_Preparation_Tips from "./pages/pagesCustomer/Marriage_Preparation_Tips";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}

        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          element={
            <CustomerGuard>
              <CustomerApp />
            </CustomerGuard>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/pre-marige" element={<Pre_MarriageAdvice />} />
          <Route path="/readiness" element={<Getting_Ready_Marriage />} />
        </Route>

        {/* <Route path="/" element={<AdminApp />}>
          {/* Default route for AdminApp (shows Dashboard) *
          <Route index element={<Dashboard />} />
        </Route> */}

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <AuthGuard requiredRole="customer">
              <CustomerApp />
            </AuthGuard>
          }
        >
          <Route path="/profile" element={<ProfileCustomer />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/vows" element={<Great_Marriage_Vows />} />
          <Route
            path="/marriage-preparation/"
            element={<Marriage_Preparation_Tips />}
          />

          <Route></Route>
        </Route>

        <Route
          path="/admin-home"
          element={
            <AuthGuard requiredRole="admin">
              <AdminApp />
            </AuthGuard>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>

        <Route
          path="/therapist-home"
          element={
            <AuthGuard requiredRole="therapist">
              <TherapistApp />
            </AuthGuard>
          }
        />

        {/* Redirect all unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
