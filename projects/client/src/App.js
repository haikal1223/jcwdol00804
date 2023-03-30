import React, { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import Home from "./Pages/Home";
import Verify from "./Components/Verify";
import SignUp from "./Pages/SignUp";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Verify from "./Pages/Verify";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import ProfileSetting from "./Pages/ProfileSetting";
import ChangePassword from "./Pages/ChangePassword";
import NotFound from "./Pages/NotFound";
import PersonalData from "./Pages/PersonalData";
import SignIn from "./Pages/SignIn";
import Axios from "axios";
import { API_URL } from "./helper";
import { loginAction } from "./Actions/user";

function App() {
  const dispatch = useDispatch();
  const keepLogin = () => {
    let getLocalStorage = localStorage.getItem("xmart_login");
    if (getLocalStorage) {
      Axios.get(`${API_URL}/user/keep-login`, {
        headers: {
          Authorization: `Bearer ${getLocalStorage}`,
        },
      })
        .then((res) => {
          // localStorage.setItem("eshop_login", res.data.token); //jangan di set kembali karena token menjadi berbeda
          dispatch(loginAction(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    keepLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/personal-data" element={<PersonalData />} />
        <Route path="/verify-email" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile-setting" element={<ProfileSetting />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
