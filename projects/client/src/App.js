import React from "react";
import "./App.css";
import SignIn from "./Pages/SignIn";
import Home from "./Pages/Home";
import Verify from "./Components/Verify";
import SignUp from "./Pages/SignUp";
import { Routes, Route } from "react-router-dom";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/verify-email" element={<Verify />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
