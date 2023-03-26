import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Verify from "./Pages/Verify";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import ProfileSetting from "./Pages/ProfileSetting";
import ChangePassword from "./Pages/ChangePassword";
import MyAddress from "./Pages/MyAddress";
import AddAddress from "./Pages/AddAddress";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/verify-email" element={<Verify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile-setting" element={<ProfileSetting />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/my-address" element={<MyAddress />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
};

export default App;
