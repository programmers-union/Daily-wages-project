import React from "react";
import Landing from "./pages/landing/Landing";
import { Routes, Route } from "react-router-dom";
import SignUp from "./auth/client/SignUp";
import Login from "./auth/client/LogIn";
import Home from "./pages/home/Home";
import WorkerCalendar from "./components/worker/WorkerCalendar";
import WorkerProfile from "./components/worker/WorkerProfile";
import './App.css';
import AdminLogin from "./auth/admin/AdminLogin";
import MainDashboard from "./pages/admin/MainDashboard";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/worker-calendar" element={<WorkerCalendar />} />
        <Route path="/worker-profile" element={<WorkerProfile />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/dahboard" element={<MainDashboard />} />


      </Routes>
    </>
  );
};

export default App;
