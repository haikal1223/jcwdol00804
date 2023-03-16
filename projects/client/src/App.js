import React from "react";
import "./App.css";
// import Login from "./components/Login";
import Home from "./Pages/Home";
import Verify from "./Components/Verify";
import SignUp from "./Pages/SignUp";
import { Routes, Route } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import PersonalData from "./Pages/PersonalData";

function App() {
  return (
    <div>
      {/* <Page> */}
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/personal-data" element={<PersonalData />} />
        <Route path="/verify-email" element={<Verify />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* </Page> */}
    </div>
  );
}

export default App;
