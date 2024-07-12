import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import SignUp from "./auth/client/SignUp";
import Login from "./auth/client/LogIn";
import Home from "./pages/home/Home";
import WorkerCalendar from "./components/worker/WorkerCalendar";
import WorkerProfile from "./components/worker/WorkerProfile";
import AdminLogin from "./auth/admin/AdminLogin";
import MainDashboard from "./pages/admin/MainDashboard";
import AppProvider from "./context/AppProvider";
import OtpPage from "./components/otp/SubmitOtp";
import './App.css';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/worker-calendar" element={<WorkerCalendar />} />
        <Route path="/worker-profile" element={<WorkerProfile />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/otp" element={<OtpPage />} />
      </Routes>
    </AppProvider>
  );
};

export default App;
