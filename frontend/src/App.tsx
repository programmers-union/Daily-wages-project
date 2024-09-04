import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import SignUp from "./auth/client/SignUp";
import WorkerSignUp from "./auth/worker/WorkerSignUp";
import Login from "./auth/client/LogIn";
import Home from "./pages/home/Home";
import WorkerCalendar from "./components/worker/WorkerCalendar";
import WorkerProfile from "./components/worker/WorkerProfile";
import AdminLogin from "./auth/admin/AdminLogin";
import MainDashboard from "./pages/admin/MainDashboard";
import AppProvider from "./context/AppProvider";
import OtpPage from "./components/otp/SubmitOtp";
import './App.css';
import WorkerForm from "./components/worker/workerJobDetailsForm/WorkerForm";
import CheckEmailANdPhone from "./auth/client/forgotPassword/CheckEmailANdPhone";
import GoogleAuth from "./pages/googleAuthantication/GoogleAuth";
import ClientCalendar from "./components/client/calendar/ClientCalendar";
import ChangePassword from "./auth/client/forgotPassword/ChangePassword";
import HomeNavBar from "./components/header/HomeNavBar";
import LandingNavBar from "./components/header/LandingNavBar";
import WorkerList from "./components/admin/workerDashboard/WorkerList";


const App: React.FC = () => {
 const usepath = useLocation().pathname
    const HomeNav = usepath === '/home' ?  <HomeNavBar /> : usepath === '/'? <LandingNavBar /> : null

  return (
    <AppProvider>
       
        {HomeNav}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/worker-calendar" element={<WorkerCalendar />} />
        <Route path="/client-calendar" element={<ClientCalendar />} />
        <Route path="/profile" element={<WorkerProfile />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/worker-form" element={<WorkerForm />} />
        <Route path="/worker-sign-up" element={<WorkerSignUp />} />
        <Route path="/forgot-password" element={<CheckEmailANdPhone />} />
        <Route path="/google-auth" element={<GoogleAuth />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/admin-worker-list" element={<WorkerList />} />
        
      </Routes>
    </AppProvider>
  );
};

export default App;


