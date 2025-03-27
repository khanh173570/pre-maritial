import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/login/login-page";
import Unauthorized from "./pages/Unauthorized";
import AuthGuard from "./auth/AuthGuard";
import { CustomerGuard } from "./auth/CustomerGuard";
import { Outlet } from "react-router-dom";

import HomePage from "./pages/pagesCustomer/homePage/HomePage";
import CustomerApp from "./layouts/layoutCustomer/CustomerApp";
import AdminApp from "./layouts/layoutAdmin/AdminApp";
import TherapistApp from "./layouts/layoutTherapist/TherapistApp";
import ProfileCustomer from "./pages/pagesCustomer/profileCustomer";
import DetailPage from "./pages/pagesCustomer/homePage/DetailPage";
import Getting_Ready_Marriage from "./pages/pagesCustomer/Getting_Ready_Marriage";
import Great_Marriage_Vows from "./pages/pagesCustomer/Great_Marriage_Vows";
import Pre_MarriageAdvice from "./pages/pagesCustomer/Pre_MarriageAdvice";
import Marriage_Preparation_Tips from "./pages/pagesCustomer/Marriage_Preparation_Tips";
import PageAdmin from "./pages/pagesAdmin/pagesAdmin";

// Import các trang của Admin
import Dashboard from "./pages/pagesAdmin/Dashboard";
import Pagetest from "./pages/pagesAdmin/page01";
import AccountManagement from "./pages/pagesAdmin/AccountManagement";
import UserInfoForm from "./pages/pagesAdmin/UserInfoForm";

import { CUSTOMER, THERAPIST, ADMIN } from "./utils/constants/role";
import PagesTherapist from "./pages/pagesTherapist/PagesTherapist";

// Import Therapist Context
import GlobalProvider from "./contexts/TherapistContext";
import View_Therapist_Customer from "./pages/pagesCustomer/View_Therapist/View_Therapist";
import View_Therapist_Admin from "./pages/pagesAdmin/View_Therapist/View_Therapist";
import ScheduleTherapist from "./pages/pagesCustomer/SchedulePage/SchedulePage";
import MajorManagement from "./pages/pagesAdmin/MajorManagement";
import MajorInfoForm from "./pages/pagesAdmin/MajorInfoForm";
import AddUserForm from "./pages/pagesAdmin/AddUserForm";
import AddMajorForm from "./pages/pagesAdmin/AddMajorForm";
import Transactions from "./pages/pagesAdmin/Transactions";
import EditTherapist from "./pages/pagesAdmin/EditTherapist";
import ConsultationBookings from "./pages/pagesAdmin/ConsultationBookings";
import WithdrawRequests from "./pages/pagesAdmin/WithdrawRequests";
import ArticlesList from "./pages/pagesAdmin/ArticlesList";
import ArticleDetails from "./pages/pagesAdmin/ArticleDetails";
import CreateArticle from "./pages/pagesAdmin/CreateArticle";
const App = () => {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/customer-home" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Route cho Customer */}
          <Route
            path="/customer-home"
            element={
              <CustomerGuard>
                <CustomerApp />
              </CustomerGuard>
            }
          >
            <Route path="/customer-home" element={<HomePage />} />
            <Route path="pre-marige" element={<Pre_MarriageAdvice />} />
            <Route path="readiness" element={<Getting_Ready_Marriage />} />

            <Route
              element={
                <AuthGuard requiredRole={CUSTOMER}>
                  <CustomerApp />
                </AuthGuard>
              }
            >
              <Route path="profile" element={<ProfileCustomer />} />
              <Route path="detail/:id" element={<DetailPage />} />
              <Route path="vows" element={<Great_Marriage_Vows />} />
              <Route
                path="marriage-preparation"
                element={<Marriage_Preparation_Tips />}
              />
              <Route
                path="view-therapists"
                element={<View_Therapist_Customer />}
              />
              <Route
                path="/customer-home/view-therapists/schedule/:therapistId"
                element={<ScheduleTherapist />}
              />
            </Route>
          </Route>

          {/* Route cho Admin */}
          <Route element={<AdminApp />}>
            {/* <Route element={<Dashboard />}> */}
            <Route path="/admin-home" element={<PageAdmin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accounts" element={<AccountManagement />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/users/new" element={<AddUserForm />} />
            <Route path="/edit-user/:userId" element={<UserInfoForm />} />
            <Route path="/view-therapists" element={<View_Therapist_Admin />} />
            <Route path="/edit-therapist/:userId" element={<EditTherapist />} />
            <Route path="/view-therapist-major" element={<MajorManagement />} />
            <Route path="/majors/new" element={<AddMajorForm />} />
            <Route
              path="/edit-therapist-major/:majorId"
              element={<MajorInfoForm />}
            />
            <Route
              path="/consultation-bookings"
              element={<ConsultationBookings />}
            />
            <Route path="/withdraw-requests" element={<WithdrawRequests />} />
            <Route path="/articles" element={<ArticlesList />} />
            <Route path="/articles/create" element={<CreateArticle />} />
            <Route path="/articles/:id/details" element={<ArticleDetails />} />
          </Route>

          {/* Route cho Therapist */}
          <Route element={<TherapistApp />}>
            <Route path="/therapist-home" element={<PagesTherapist />} />
          </Route>

          {/* Mặc định chuyển hướng về customer nếu route không tồn tại */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
};

export default App;
