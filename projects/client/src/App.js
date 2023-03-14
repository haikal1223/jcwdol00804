import React from "react";
import "./App.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import Verify from "./Components/Verify";
import SignUp from "./Pages/SignUp";
import { Routes, Route } from "react-router-dom";
import Page from "./Components/Page";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <div>
      <Page>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<Verify />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Page>
    </div>
  );
}

export default App;
