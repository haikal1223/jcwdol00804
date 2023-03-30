import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
import Page from "./Components/Page";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Verify from "./Components/Verify";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <div>
      <Page>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          {/* <Route path="/sign-in" element={<Login />} /> */}
          <Route path="/verify-email" element={<Verify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Page>
    </div>
  );
};

export default App;
