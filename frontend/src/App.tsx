import React from "react";
import Home from "./pages/client/home/Home";
import { Routes, Route } from "react-router-dom";
import SignUp from "./auth/client/SignUp";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
